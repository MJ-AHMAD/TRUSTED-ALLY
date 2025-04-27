<#
.SYNOPSIS
    YT-DLP Video Downloader with Watermark Removal
.DESCRIPTION
    This script uses yt-dlp to download videos while preserving original quality
    and provides functionality to remove static watermarks using ffmpeg.
.PARAMETER Command
    The command to execute: download, remove-watermark, list-profiles, add-profile
.PARAMETER Url
    URL of the video to download (for download command)
.PARAMETER Profile
    Download profile to use (for download command)
.PARAMETER OutputDir
    Output directory for downloaded videos (for download command)
.PARAMETER VideoFile
    Path to the video file (for remove-watermark command)
.PARAMETER X
    X coordinate of watermark (for remove-watermark command)
.PARAMETER Y
    Y coordinate of watermark (for remove-watermark command)
.PARAMETER Width
    Width of watermark (for remove-watermark command)
.PARAMETER Height
    Height of watermark (for remove-watermark command)
.PARAMETER ProfileName
    Name of the profile (for add-profile command)
.PARAMETER Description
    Description of the profile (for add-profile command)
.PARAMETER CommandOptions
    yt-dlp command options (for add-profile command)
.EXAMPLE
    .\yt_dlp_downloader.ps1 -Command download -Url "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -Profile "best_quality"
.EXAMPLE
    .\yt_dlp_downloader.ps1 -Command remove-watermark -VideoFile "video.mp4" -X 10 -Y 10 -Width 100 -Height 50
.EXAMPLE
    .\yt_dlp_downloader.ps1 -Command list-profiles
.EXAMPLE
    .\yt_dlp_downloader.ps1 -Command add-profile -ProfileName "my_profile" -Description "My custom profile" -CommandOptions "--format bestvideo+bestaudio/best"
#>

param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("download", "remove-watermark", "list-profiles", "add-profile")]
    [string]$Command,
    
    [Parameter(Mandatory=$false)]
    [string]$Url,
    
    [Parameter(Mandatory=$false)]
    [string]$Profile,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputDir,
    
    [Parameter(Mandatory=$false)]
    [string]$VideoFile,
    
    [Parameter(Mandatory=$false)]
    [int]$X,
    
    [Parameter(Mandatory=$false)]
    [int]$Y,
    
    [Parameter(Mandatory=$false)]
    [int]$Width,
    
    [Parameter(Mandatory=$false)]
    [int]$Height,
    
    [Parameter(Mandatory=$false)]
    [string]$ProfileName,
    
    [Parameter(Mandatory=$false)]
    [string]$Description,
    
    [Parameter(Mandatory=$false)]
    [string]$CommandOptions
)

# Configuration file path
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$configFile = Join-Path -Path $scriptPath -ChildPath "config.json"

function Create-DefaultConfig {
    $defaultConfig = @{
        ffmpeg_path = "ffmpeg"
        ffprobe_path = "ffprobe"
        output_dir = "downloads"
        output_template = "%(title)s [%(id)s].%(ext)s"
        download_profiles = @(
            @{
                name = "best_quality"
                description = "Download best quality video and audio"
                command = "--format bestvideo+bestaudio/best --merge-output-format mp4"
            },
            @{
                name = "audio_only"
                description = "Extract audio only in mp3 format"
                command = "-x --audio-format mp3 --audio-quality 0"
            },
            @{
                name = "preserve_all"
                description = "Preserve original audio, resolution, and all attributes"
                command = "--format bestvideo+bestaudio/best --merge-output-format mkv --no-mtime"
            }
        )
    }
    
    $defaultConfig | ConvertTo-Json -Depth 10 | Set-Content -Path $configFile
    
    return $defaultConfig
}

function Load-Config {
    if (-not (Test-Path $configFile)) {
        Write-Host "Configuration file not found. Creating default at $configFile"
        return Create-DefaultConfig
    }
    
    try {
        $config = Get-Content -Path $configFile -Raw | ConvertFrom-Json
        return $config
    }
    catch {
        Write-Host "Error parsing configuration file. Using default configuration."
        return Create-DefaultConfig
    }
}

function Save-ConfigFile {
    param (
        [Parameter(Mandatory=$true)]
        [PSCustomObject]$Config
    )
    
    $Config | ConvertTo-Json -Depth 10 | Set-Content -Path $configFile
}

function Check-Dependencies {
    param (
        [Parameter(Mandatory=$true)]
        [PSCustomObject]$Config
    )
    
    # Check for yt-dlp
    try {
        $null = & yt-dlp --version
    }
    catch {
        Write-Host "Error: yt-dlp is not installed or not in PATH."
        Write-Host "Please install it using: pip install yt-dlp"
        return $false
    }
    
    # Check for ffmpeg
    $ffmpegPath = $Config.ffmpeg_path
    if (-not $ffmpegPath) {
        $ffmpegPath = "ffmpeg"
    }
    
    try {
        $null = & $ffmpegPath -version
    }
    catch {
        Write-Host "Error: ffmpeg is not installed or not found at $ffmpegPath"
        Write-Host "Please install ffmpeg and update the path in the configuration file."
        return $false
    }
    
    # Check for ffprobe
    $ffprobePath = $Config.ffprobe_path
    if (-not $ffprobePath) {
        $ffprobePath = "ffprobe"
    }
    
    try {
        $null = & $ffprobePath -version
    }
    catch {
        Write-Host "Error: ffprobe is not installed or not found at $ffprobePath"
        Write-Host "Please install ffprobe and update the path in the configuration file."
        return $false
    }
    
    return $true
}

function Download-Video {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Url,
        
        [Parameter(Mandatory=$false)]
        [string]$ProfileName,
        
        [Parameter(Mandatory=$false)]
        [string]$OutputDir,
        
        [Parameter(Mandatory=$false)]
        [string]$OutputTemplate,
        
        [Parameter(Mandatory=$false)]
        [PSCustomObject]$Config
    )
    
    if (-not $Config) {
        $Config = Load-Config
    }
    
    if (-not $OutputDir) {
        $OutputDir = $Config.output_dir
        if (-not $OutputDir) {
            $OutputDir = "downloads"
        }
    }
    
    if (-not $OutputTemplate) {
        $OutputTemplate = $Config.output_template
        if (-not $OutputTemplate) {
            $OutputTemplate = "%(title)s [%(id)s].%(ext)s"
        }
    }
    
    # Create output directory if it doesn't exist
    if (-not (Test-Path $OutputDir)) {
        New-Item -Path $OutputDir -ItemType Directory | Out-Null
    }
    
    # Build command
    $cmd = "yt-dlp"
    
    # Add profile command if specified
    if ($ProfileName) {
        $profileCmd = $null
        foreach ($profile in $Config.download_profiles) {
            if ($profile.name -eq $ProfileName) {
                $profileCmd = $profile.command
                break
            }
        }
        
        if ($profileCmd) {
            $cmd += " $profileCmd"
        }
        else {
            Write-Host "Warning: Profile '$ProfileName' not found. Using default settings."
        }
    }
    
    # Add output template
    $outputPath = Join-Path -Path $OutputDir -ChildPath $OutputTemplate
    $cmd += " -o `"$outputPath`""
    
    # Add URL
    $cmd += " `"$Url`""
    
    Write-Host "Executing command: $cmd"
    
    # Run yt-dlp
    try {
        $output = Invoke-Expression $cmd
        Write-Host $output
        
        # Extract filename from output
        foreach ($line in $output) {
            if ($line -match "\[download\] Destination: (.+)") {
                $filename = $matches[1]
                return $filename
            }
        }
        
        # If we couldn't find the filename in the output, try to guess it
        return $null
    }
    catch {
        Write-Host "Error downloading video: $_"
        return $null
    }
}

function Remove-VideoWatermark {
    param (
        [Parameter(Mandatory=$true)]
        [string]$VideoFile,
        
        [Parameter(Mandatory=$true)]
        [int]$X,
        
        [Parameter(Mandatory=$true)]
        [int]$Y,
        
        [Parameter(Mandatory=$true)]
        [int]$Width,
        
        [Parameter(Mandatory=$true)]
        [int]$Height,
        
        [Parameter(Mandatory=$false)]
        [PSCustomObject]$Config
    )
    
    if (-not $Config) {
        $Config = Load-Config
    }
    
    $ffmpegPath = $Config.ffmpeg_path
    if (-not $ffmpegPath) {
        $ffmpegPath = "ffmpeg"
    }
    
    # Create a temporary file for the processed video
    $tempDir = [System.IO.Path]::GetTempPath()
    $tempOutput = Join-Path -Path $tempDir -ChildPath "nowatermark_$([System.IO.Path]::GetFileName($VideoFile))"
    
    # Build ffmpeg command to remove watermark
    # We use the delogo filter to remove the watermark
    $cmd = "$ffmpegPath -i `"$VideoFile`" -vf `"delogo=x=$X`:y=$Y`:w=$Width`:h=$Height`:show=0`" -c:a copy -c:v libx264 -preset medium -crf 18 `"$tempOutput`""
    
    Write-Host "Removing watermark with command: $cmd"
    
    try {
        Invoke-Expression $cmd
        
        # Replace original file with processed file
        Move-Item -Path $tempOutput -Destination $VideoFile -Force
        Write-Host "Watermark removed successfully from $VideoFile"
        return $true
    }
    catch {
        Write-Host "Error removing watermark: $_"
        return $false
    }
}

function List-Profiles {
    param (
        [Parameter(Mandatory=$false)]
        [PSCustomObject]$Config
    )
    
    if (-not $Config) {
        $Config = Load-Config
    }
    
    $profiles = $Config.download_profiles
    
    if (-not $profiles -or $profiles.Count -eq 0) {
        Write-Host "No download profiles found."
        return
    }
    
    Write-Host "`nAvailable download profiles:"
    Write-Host ("-" * 50)
    
    for ($i = 0; $i -lt $profiles.Count; $i++) {
        $profile = $profiles[$i]
        Write-Host "$($i+1). $($profile.name)"
        Write-Host "   Description: $($profile.description)"
        Write-Host "   Command: $($profile.command)"
        Write-Host ""
    }
}

function Add-DownloadProfile {
    param (
        [Parameter(Mandatory=$true)]
        [string]$Name,
        
        [Parameter(Mandatory=$true)]
        [string]$Description,
        
        [Parameter(Mandatory=$true)]
        [string]$Command,
        
        [Parameter(Mandatory=$false)]
        [PSCustomObject]$Config
    )
    
    if (-not $Config) {
        $Config = Load-Config
    }
    
    # Check if profile with the same name already exists
    foreach ($profile in $Config.download_profiles) {
        if ($profile.name -eq $Name) {
            Write-Host "Error: Profile '$Name' already exists."
            return $false
        }
    }
    
    # Add new profile
    $newProfile = @{
        name = $Name
        description = $Description
        command = $Command
    }
    
    if (-not $Config.download_profiles) {
        $Config | Add-Member -NotePropertyName download_profiles -NotePropertyValue @()
    }
    
    $Config.download_profiles += $newProfile
    Save-ConfigFile -Config $Config
    
    Write-Host "Profile '$Name' added successfully."
    return $true
}

# Main script execution
$config = Load-Config

# Check dependencies
if (-not (Check-Dependencies -Config $config)) {
    exit 1
}

# Execute command
switch ($Command) {
    "download" {
        if (-not $Url) {
            Write-Host "Error: URL is required for download command."
            exit 1
        }
        
        $filename = Download-Video -Url $Url -ProfileName $Profile -OutputDir $OutputDir -Config $config
        if ($filename) {
            Write-Host "Video downloaded successfully: $filename"
        }
        else {
            Write-Host "Failed to download video."
        }
    }
    
    "remove-watermark" {
        if (-not $VideoFile) {
            Write-Host "Error: Video file is required for remove-watermark command."
            exit 1
        }
        
        if (-not (Test-Path $VideoFile)) {
            Write-Host "Error: Video file not found: $VideoFile"
            exit 1
        }
        
        $success = Remove-VideoWatermark -VideoFile $VideoFile -X $X -Y $Y -Width $Width -Height $Height -Config $config
        if (-not $success) {
            exit 1
        }
    }
    
    "list-profiles" {
        List-Profiles -Config $config
    }
    
    "add-profile" {
        if (-not $ProfileName -or -not $Description -or -not $CommandOptions) {
            Write-Host "Error: Profile name, description, and command options are required for add-profile command."
            exit 1
        }
        
        $success = Add-DownloadProfile -Name $ProfileName -Description $Description -Command $CommandOptions -Config $config
        if (-not $success) {
            exit 1
        }
    }
}