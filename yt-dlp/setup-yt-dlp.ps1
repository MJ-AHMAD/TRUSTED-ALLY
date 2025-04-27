# setup-yt-dlp.ps1 ফাইল তৈরি করুন
$setupScriptContent = @'
# YT-DLP ভিডিও ডাউনলোডার সেটআপ স্ক্রিপ্ট

# ১. নতুন প্রজেক্ট ডিরেক্টরি সেটআপ
$projectRoot = "C:\Users\tally\dira24s1\docs\yt-dlp-1"
New-Item -Path $projectRoot -ItemType Directory -Force

# নতুন ডিরেক্টরিতে যান
Set-Location -Path $projectRoot

# প্রজেক্ট ডিরেক্টরি পাথ দেখুন
Write-Host "বর্তমান ডিরেক্টরি: $((Get-Location).Path)" -ForegroundColor Green

# প্রয়োজনীয় সাব-ডিরেক্টরি তৈরি করুন
$directories = @("downloads", "audio-library", "branding", "temp")

foreach ($dir in $directories) {
    $path = Join-Path -Path $projectRoot -ChildPath $dir
    New-Item -Path $path -ItemType Directory -Force
    Write-Host "ডিরেক্টরি তৈরি করা হয়েছে: $path" -ForegroundColor Cyan
}

# ডিরেক্টরি স্ট্রাকচার দেখুন
Get-ChildItem -Path $projectRoot -Directory | Format-Table Name

# ২. কনফিগারেশন ফাইল তৈরি করুন
$configContent = @{
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
        },
        @{
            name = "4k"
            description = "Download 4K video if available"
            command = "--format bestvideo[height<=2160]+bestaudio/best[height<=2160] --merge-output-format mp4"
        },
        @{
            name = "1080p"
            description = "Download 1080p video"
            command = "--format bestvideo[height<=1080]+bestaudio/best[height<=1080] --merge-output-format mp4"
        },
        @{
            name = "no_throttle"
            description = "Download with no rate limiting"
            command = "--format bestvideo+bestaudio/best --merge-output-format mp4 --no-rate-limit"
        },
        @{
            name = "subtitles"
            description = "Download video with all available subtitles"
            command = "--format bestvideo+bestaudio/best --merge-output-format mp4 --write-subs --sub-langs all"
        }
    )
} | ConvertTo-Json -Depth 10

$configPath = Join-Path -Path $projectRoot -ChildPath "config.json"
$configContent | Out-File -FilePath $configPath -Encoding utf8

Write-Host "কনফিগারেশন ফাইল তৈরি করা হয়েছে: $configPath" -ForegroundColor Green

# ৩. স্ক্রিপ্ট ফাইল তৈরি করুন

# ৩.১. YT-DLP ডাউনলোডার স্ক্রিপ্ট
$ytDlpDownloaderContent = @'
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
'@

$ytDlpDownloaderPath = Join-Path -Path $projectRoot -ChildPath "yt_dlp_downloader.ps1"
$ytDlpDownloaderContent | Out-File -FilePath $ytDlpDownloaderPath -Encoding utf8

Write-Host "YT-DLP ডাউনলোডার স্ক্রিপ্ট তৈরি করা হয়েছে: $ytDlpDownloaderPath" -ForegroundColor Green

# ৩.২. অডিও রিপ্লেসমেন্ট স্ক্রিপ্ট
$replaceAudioContent = @'
param (
    [Parameter(Mandatory=$true)]
    [string]$VideoFile,
    
    [Parameter(Mandatory=$true)]
    [string]$AudioFile,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFile,
    
    [Parameter(Mandatory=$false)]
    [switch]$AddWatermark,
    
    [Parameter(Mandatory=$false)]
    [string]$WatermarkText = "© আপনার নাম",
    
    [Parameter(Mandatory=$false)]
    [string]$WatermarkPosition = "bottomright"
)

# কনফিগারেশন লোড করুন
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$configFile = Join-Path -Path $scriptPath -ChildPath "config.json"
$config = Get-Content -Path $configFile -Raw | ConvertFrom-Json

# FFmpeg পাথ নির্ধারণ করুন
$ffmpegPath = $config.ffmpeg_path
if (-not $ffmpegPath) {
    $ffmpegPath = "ffmpeg"
}

# আউটপুট ফাইল নাম নির্ধারণ করুন
if (-not $OutputFile) {
    $directory = [System.IO.Path]::GetDirectoryName($VideoFile)
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($VideoFile)
    $extension = [System.IO.Path]::GetExtension($VideoFile)
    $OutputFile = Join-Path -Path $directory -ChildPath "$($filename)_edited$($extension)"
}

# ওয়াটারমার্ক পজিশন ম্যাপিং
$positionMap = @{
    "topleft" = "10:10";
    "topright" = "W-tw-10:10";
    "bottomleft" = "10:H-th-10";
    "bottomright" = "W-tw-10:H-th-10";
    "center" = "(W-tw)/2:(H-th)/2"
}

$position = $positionMap[$WatermarkPosition]
if (-not $position) {
    $position = $positionMap["bottomright"]
}

# কমান্ড তৈরি করুন
if ($AddWatermark) {
    # অডিও প্রতিস্থাপন এবং ওয়াটারমার্ক যোগ করুন
    $cmd = "$ffmpegPath -i `"$VideoFile`" -i `"$AudioFile`" -map 0:v -map 1:a -c:v libx264 -c:a aac -shortest -vf `"drawtext=text='$WatermarkText':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=$position`" `"$OutputFile`""
} else {
    # শুধু অডিও প্রতিস্থাপন করুন
    $cmd = "$ffmpegPath -i `"$VideoFile`" -i `"$AudioFile`" -map 0:v -map 1:a -c:v copy -c:a aac -shortest `"$OutputFile`""
}

Write-Host "কমান্ড চালানো হচ্ছে: $cmd"
Invoke-Expression $cmd

if (Test-Path $OutputFile) {
    Write-Host "সফলভাবে ভিডিও প্রস্তুত করা হয়েছে: $OutputFile"
} else {
    Write-Host "ভিডিও প্রস্তুত করতে সমস্যা হয়েছে।"
}
'@

$replaceAudioPath = Join-Path -Path $projectRoot -ChildPath "replace_audio.ps1"
$replaceAudioContent | Out-File -FilePath $replaceAudioPath -Encoding utf8

Write-Host "অডিও রিপ্লেসমেন্ট স্ক্রিপ্ট তৈরি করা হয়েছে: $replaceAudioPath" -ForegroundColor Green

# ৩.৩. ভিডিও ব্র্যান্ডিং স্ক্রিপ্ট
$brandVideoContent = @'
param (
    [Parameter(Mandatory=$true)]
    [string]$VideoFile,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFile,
    
    [Parameter(Mandatory=$false)]
    [string]$LogoFile,
    
    [Parameter(Mandatory=$false)]
    [string]$WatermarkText = "© আপনার নাম",
    
    [Parameter(Mandatory=$false)]
    [string]$IntroText = "আপনার প্রেজেন্টেশন",
    
    [Parameter(Mandatory=$false)]
    [switch]$AddIntro,
    
    [Parameter(Mandatory=$false)]
    [switch]$AddOutro
)

# কনফিগারেশন লোড করুন
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$configFile = Join-Path -Path $scriptPath -ChildPath "config.json"
$config = Get-Content -Path $configFile -Raw | ConvertFrom-Json

# FFmpeg পাথ নির্ধারণ করুন
$ffmpegPath = $config.ffmpeg_path
if (-not $ffmpegPath) {
    $ffmpegPath = "ffmpeg"
}

# আউটপুট ফাইল নাম নির্ধারণ করুন
if (-not $OutputFile) {
    $directory = [System.IO.Path]::GetDirectoryName($VideoFile)
    $filename = [System.IO.Path]::GetFileNameWithoutExtension($VideoFile)
    $extension = [System.IO.Path]::GetExtension($VideoFile)
    $OutputFile = Join-Path -Path $directory -ChildPath "$($filename)_branded$($extension)"
}

# ফিল্টার কমান্ড তৈরি করুন
$filterComplex = ""

# লোগো ওয়াটারমার্ক যোগ করুন
if ($LogoFile -and (Test-Path $LogoFile)) {
    $filterComplex += "[0:v][1:v] overlay=W-w-10:10 [v1]; "
    $inputArgs = "-i `"$VideoFile`" -i `"$LogoFile`" "
    $mapArgs = "-map `"[v1]`" -map 0:a "
} else {
    $inputArgs = "-i `"$VideoFile`" "
    $filterComplex += "[0:v] "
    $mapArgs = "-map `"[v1]`" -map 0:a "
}

# টেক্সট ওয়াটারমার্ক যোগ করুন
$filterComplex += "drawtext=text='$WatermarkText':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=W-tw-10:y=H-th-10 [v1]"

# কমান্ড তৈরি করুন
$cmd = "$ffmpegPath $inputArgs -filter_complex `"$filterComplex`" $mapArgs -c:v libx264 -c:a copy `"$OutputFile`""

Write-Host "কমান্ড চালানো হচ্ছে: $cmd"
Invoke-Expression $cmd

if (Test-Path $OutputFile) {
    Write-Host "সফলভাবে ভিডিও ব্র্যান্ড করা হয়েছে: $OutputFile"
} else {
    Write-Host "ভিডিও ব্র্যান্ড করতে সমস্যা হয়েছে।"
}
'@

$brandVideoPath = Join-Path -Path $projectRoot -ChildPath "brand_video.ps1"
$brandVideoContent | Out-File -FilePath $brandVideoPath -Encoding utf8

Write-Host "ভিডিও ব্র্যান্ডিং স্ক্রিপ্ট তৈরি করা হয়েছে: $brandVideoPath" -ForegroundColor Green

# ৩.৪. অল-ইন-ওয়ান ডাউনলোড এবং প্রসেসিং স্ক্রিপ্ট
$downloadAndBrandContent = @'
param (
    [Parameter(Mandatory=$true)]
    [string]$Url,
    
    [Parameter(Mandatory=$false)]
    [string]$AudioFile,
    
    [Parameter(Mandatory=$false)]
    [string]$LogoFile,
    
    [Parameter(Mandatory=$false)]
    [string]$WatermarkText = "© আপনার নাম",
    
    [Parameter(Mandatory=$false)]
    [string]$OutputDir,
    
    [Parameter(Mandatory=$false)]
    [switch]$ReplaceAudio,
    
    [Parameter(Mandatory=$false)]
    [switch]$AddWatermark
)

# কনফিগারেশন লোড করুন
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$configFile = Join-Path -Path $scriptPath -ChildPath "config.json"
$config = Get-Content -Path $configFile -Raw | ConvertFrom-Json

# FFmpeg পাথ নির্ধারণ করুন
$ffmpegPath = $config.ffmpeg_path
if (-not $ffmpegPath) {
    $ffmpegPath = "ffmpeg"
}

# আউটপুট ডিরেক্টরি নির্ধারণ করুন
if (-not $OutputDir) {
    $OutputDir = $config.output_dir
    if (-not $OutputDir) {
        $OutputDir = "downloads"
    }
}

# ভিডিও ডাউনলোড করুন
Write-Host "ভিডিও ডাউনলোড করা হচ্ছে..."
$downloadCmd = ".\yt_dlp_downloader.ps1 -Command download -Url `"$Url`" -Profile `"preserve_all`""
$downloadOutput = Invoke-Expression $downloadCmd

# ডাউনলোড করা ফাইলের পাথ খুঁজুন
$videoFile = $null
foreach ($line in $downloadOutput) {
    if ($line -match "\[download\] Destination: (.+)") {
        $videoFile = $matches[1]
        break
    }
}

if (-not $videoFile -or -not (Test-Path $videoFile)) {
    Write-Host "ভিডিও ডাউনলোড করতে সমস্যা হয়েছে বা ফাইল পাথ খুঁজে পাওয়া যায়নি।"
    exit 1
}

Write-Host "ভিডিও ডাউনলোড সম্পন্ন: $videoFile"

# প্রসেসিং আউটপুট ফাইল নাম নির্ধারণ করুন
$directory = [System.IO.Path]::GetDirectoryName($videoFile)
$filename = [System.IO.Path]::GetFileNameWithoutExtension($videoFile)
$extension = [System.IO.Path]::GetExtension($videoFile)
$processedFile = Join-Path -Path $directory -ChildPath "$($filename)_processed$($extension)"

# ফিল্টার কমান্ড তৈরি করুন
$filterComplex = ""
$inputArgs = "-i `"$videoFile`" "
$mapArgs = ""

# অডিও প্রতিস্থাপন করুন
if ($ReplaceAudio -and $AudioFile -and (Test-Path $AudioFile)) {
    Write-Host "অডিও প্রতিস্থাপন করা হচ্ছে..."
    $inputArgs += "-i `"$AudioFile`" "
    $mapArgs = "-map 0:v -map 1:a -c:v libx264 -c:a aac -shortest "
    $filterComplex += "[0:v] "
} else {
    $mapArgs = "-map 0:v -map 0:a -c:v libx264 -c:a copy "
    $filterComplex += "[0:v] "
}

# লোগো ওয়াটারমার্ক যোগ করুন
if ($AddWatermark -and $LogoFile -and (Test-Path $LogoFile)) {
    Write-Host "লোগো ওয়াটারমার্ক যোগ করা হচ্ছে..."
    $inputArgs += "-i `"$LogoFile`" "
    $filterComplex = "[0:v][2:v] overlay=W-w-10:10 [v1]; [v1] "
}

# টেক্সট ওয়াটারমার্ক যোগ করুন
if ($AddWatermark) {
    Write-Host "টেক্সট ওয়াটারমার্ক যোগ করা হচ্ছে..."
    $filterComplex += "drawtext=text='$WatermarkText':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=W-tw-10:y=H-th-10 [v1]"
    $mapArgs = "-map `"[v1]`" " + $mapArgs.Substring($mapArgs.IndexOf("-map 0:a"))
} else {
    $filterComplex = ""
    $mapArgs = "-c:v libx264 -c:a copy "
}

# কমান্ড তৈরি করুন
if ($filterComplex) {
    $cmd = "$ffmpegPath $inputArgs -filter_complex `"$filterComplex`" $mapArgs `"$processedFile`""
} else {
    $cmd = "$ffmpegPath $inputArgs $mapArgs `"$processedFile`""
}

Write-Host "ভিডিও প্রসেসিং করা হচ্ছে..."
Write-Host "কমান্ড চালানো হচ্ছে: $cmd"
Invoke-Expression $cmd

if (Test-Path $processedFile) {
    Write-Host "সফলভাবে ভিডিও প্রসেস করা হয়েছে: $processedFile"
} else {
    Write-Host "ভিডিও প্রসেস করতে সমস্যা হয়েছে।"
}
'@

$downloadAndBrandPath = Join-Path -Path $projectRoot -ChildPath "download_and_brand.ps1"
$downloadAndBrandContent | Out-File -FilePath $downloadAndBrandPath -Encoding utf8

Write-Host "অল-ইন-ওয়ান ডাউনলোড এবং প্রসেসিং স্ক্রিপ্ট তৈরি করা হয়েছে: $downloadAndBrandPath" -ForegroundColor Green

# ৩.৫. সম্পূর্ণ প্রক্রিয়া স্ক্রিপ্ট
$processFacebookVideoContent = @'
param (
    [Parameter(Mandatory=$true)]
    [string]$FacebookUrl,
    
    [Parameter(Mandatory=$false)]
    [string]$BrandName = "আপনার নাম",
    
    [Parameter(Mandatory=$false)]
    [string]$AudioFile = "audio-library\background-music.mp3",
    
    [Parameter(Mandatory=$false)]
    [string]$LogoFile = "branding\logo.png",
    
    [Parameter(Mandatory=$false)]
    [switch]$OptimizeForFacebook
)

# প্রজেক্ট ডিরেক্টরিতে যান
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptPath

# কনফিগারেশন লোড করুন
$configFile = Join-Path -Path $scriptPath -ChildPath "config.json"
$config = Get-Content -Path $configFile -Raw | ConvertFrom-Json

# FFmpeg পাথ নির্ধারণ করুন
$ffmpegPath = $config.ffmpeg_path
if (-not $ffmpegPath) {
    $ffmpegPath = "ffmpeg"
}

# ১. ফেসবুক ভিডিও ডাউনলোড করুন
Write-Host "১. ফেসবুক ভিডিও ডাউনলোড করা হচ্ছে..."
$downloadCmd = ".\yt_dlp_downloader.ps1 -Command download -Url `"$FacebookUrl`" -Profile `"preserve_all`""
$downloadOutput = Invoke-Expression $downloadCmd

# ডাউনলোড করা ফাইলের পাথ খুঁজুন
$videoFile = $null
foreach ($line in $downloadOutput) {
    if ($line -match "\[download\] Destination: (.+)") {
        $videoFile = $matches[1]
        break
    }
}

if (-not $videoFile -or -not (Test-Path $videoFile)) {
    Write-Host "ভিডিও ডাউনলোড করতে সমস্যা হয়েছে বা ফাইল পাথ খুঁজে পাওয়া যায়নি।"
    exit 1
}

Write-Host "ভিডিও ডাউনলোড সম্পন্ন: $videoFile"

# ২. অডিও প্রতিস্থাপন করুন
Write-Host "২. অডিও প্রতিস্থাপন করা হচ্ছে..."
$outputVideoWithAudio = "downloads\video_with_new_audio.mp4"

if (Test-Path $AudioFile) {
    .\replace_audio.ps1 -VideoFile $videoFile -AudioFile $AudioFile -OutputFile $outputVideoWithAudio
} else {
    Write-Host "অডিও ফাইল পাওয়া যায়নি: $AudioFile"
    Write-Host "অডিও প্রতিস্থাপন বাদ দেওয়া হচ্ছে..."
    $outputVideoWithAudio = $videoFile
}

# ৩. ব্র্যান্ডিং যোগ করুন
Write-Host "৩. ব্র্যান্ডিং যোগ করা হচ্ছে..."
$finalOutput = "downloads\final_branded_video.mp4"

if (Test-Path $LogoFile) {
    .\brand_video.ps1 -VideoFile $outputVideoWithAudio -LogoFile $LogoFile -WatermarkText "© $BrandName" -OutputFile $finalOutput
} else {
    Write-Host "লোগো ফাইল পাওয়া যায়নি: $LogoFile"
    Write-Host "শুধু টেক্সট ওয়াটারমার্ক যোগ করা হচ্ছে..."
    .\brand_video.ps1 -VideoFile $outputVideoWithAudio -WatermarkText "© $BrandName" -OutputFile $finalOutput
}

# ৪. ফেসবুকের জন্য অপ্টিমাইজ করুন (যদি প্রয়োজন হয়)
if ($OptimizeForFacebook) {
    Write-Host "৪. ফেসবুকের জন্য অপ্টিমাইজ করা হচ্ছে..."
    $optimizedVideo = "downloads\final_optimized_for_facebook.mp4"
    
    # ফেসবুকের জন্য অপ্টিমাইজ করুন (1080p, 2 Mbps বিটরেট)
    $cmd = "$ffmpegPath -i `"$finalOutput`" -c:v libx264 -preset medium -crf 23 -vf `"scale=-2:1080`" -c:a aac -b:a 128k `"$optimizedVideo`""
    Invoke-Expression $cmd
    
    Write-Host "ফেসবুকের জন্য অপ্টিমাইজ করা হয়েছে: $optimizedVideo"
    $finalOutput = $optimizedVideo
}

# ৫. ফাইনাল ভিডিও চেক করুন
if (Test-Path $finalOutput) {
    Write-Host "৫. সফলভাবে ভিডিও প্রসেস করা হয়েছে: $finalOutput"
    
    # ভিডিও ফাইলের তথ্য দেখুন
    $ffprobePath = $config.ffprobe_path
    if (-not $ffprobePath) {
        $ffprobePath = "ffprobe"
    }
    
    $cmd = "$ffprobePath -v quiet -print_format json -show_format -show_streams `"$finalOutput`""
    $videoInfo = Invoke-Expression $cmd | ConvertFrom-Json
    
    Write-Host "ভিডিও তথ্য:"
    Write-Host "ডিউরেশন: $($videoInfo.format.duration) সেকেন্ড"
    Write-Host "ফাইল সাইজ: $([Math]::Round($videoInfo.format.size / 1MB, 2)) MB"
    
    # ভিডিও ফাইল এক্সপ্লোরারে খুলুন
    explorer.exe /select,$finalOutput
    
    Write-Host "প্রসেস সম্পন্ন! এখন আপনি এই ভিডিও ফেসবুকে আপলোড করতে পারেন।"
} else {
    Write-Host "ভিডিও প্রসেস করতে সমস্যা হয়েছে।"
}
'@

$processFacebookVideoPath = Join-Path -Path $projectRoot -ChildPath "process_facebook_video.ps1"
$processFacebookVideoContent | Out-File -FilePath $processFacebookVideoPath -Encoding utf8

Write-Host "সম্পূর্ণ প্রক্রিয়া স্ক্রিপ্ট তৈরি করা হয়েছে: $processFacebookVideoPath" -ForegroundColor Green

# ৪. কপিরাইট-মুক্ত অডিও ডাউনলোড করুন
$audioUrl = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bbd.mp3"
$audioPath = Join-Path -Path $projectRoot -ChildPath "audio-library\background-music.mp3"
Invoke-WebRequest -Uri $audioUrl -OutFile $audioPath
Write-Host "কপিরাইট-মুক্ত অডিও ডাউনলোড করা হয়েছে: $audioPath" -ForegroundColor Green

# ৫. সাধারণ লোগো তৈরি করুন
$logoText = @"
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="rgba(0,0,0,0.5)" rx="10" ry="10" />
  <text x="100" y="50" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">আপনার লোগো</text>
</svg>
"@
$logoPath = Join-Path -Path $projectRoot -ChildPath "branding\logo.svg"
$logoText | Out-File -FilePath $logoPath -Encoding utf8
Write-Host "সাধারণ লোগো তৈরি করা হয়েছে: $logoPath" -ForegroundColor Green

# SVG থেকে PNG তৈরি করুন (FFmpeg ব্যবহার করে)
$config = Get-Content -Path (Join-Path -Path $projectRoot -ChildPath "config.json") -Raw | ConvertFrom-Json
$ffmpegPath = $config.ffmpeg_path
if (-not $ffmpegPath) {
    $ffmpegPath = "ffmpeg"
}

$logoPngPath = Join-Path -Path $projectRoot -ChildPath "branding\logo.png"
$cmd = "$ffmpegPath -f lavfi -i color=c=black:s=200x100 -i `"$logoPath`" -filter_complex `"[0:v][1:v]overlay=0:0`" -y `"$logoPngPath`""
Invoke-Expression $cmd
Write-Host "PNG লোগো তৈরি করা হয়েছে: $logoPngPath" -ForegroundColor Green

# ৬. পাওয়ারশেল প্রোফাইল ফাইল তৈরি করুন
$profileContent = @"
# YT-DLP ভিডিও ডাউনলোডার প্রোফাইল
`$projectRoot = "$projectRoot"

function Set-YtDlpProject {
    Set-Location -Path `$projectRoot
    Write-Host "YT-DLP প্রজেক্ট ডিরেক্টরিতে যাওয়া হয়েছে: `$projectRoot" -ForegroundColor Green
}

function Get-DownloadProfiles {
    Set-YtDlpProject
    .\yt_dlp_downloader.ps1 -Command list-profiles
}

function Download-Video {
    param (
        [Parameter(Mandatory=`$true)]
        [string]`$Url,
        
        [Parameter(Mandatory=`$false)]
        [string]`$Profile = "preserve_all"
    )
    
    Set-YtDlpProject
    .\yt_dlp_downloader.ps1 -Command download -Url `$Url -Profile `$Profile
}

function Process-FacebookVideo {
    param (
        [Parameter(Mandatory=`$true)]
        [string]`$FacebookUrl,
        
        [Parameter(Mandatory=`$false)]
        [string]`$BrandName = "আপনার নাম",
        
        [Parameter(Mandatory=`$false)]
        [switch]`$OptimizeForFacebook
    )
    
    Set-YtDlpProject
    
    `$cmd = ".\process_facebook_video.ps1 -FacebookUrl `"`$FacebookUrl`" -BrandName `"`$BrandName`""
    if (`$OptimizeForFacebook) {
        `$cmd += " -OptimizeForFacebook"
    }
    
    Invoke-Expression `$cmd
}

function Replace-VideoAudio {
    param (
        [Parameter(Mandatory=`$true)]
        [string]`$VideoFile,
        
        [Parameter(Mandatory=`$true)]
        [string]`$AudioFile,
        
        [Parameter(Mandatory=`$false)]
        [string]`$OutputFile,
        
        [Parameter(Mandatory=`$false)]
        [switch]`$AddWatermark,
        
        [Parameter(Mandatory=`$false)]
        [string]`$WatermarkText = "© আপনার নাম"
    )
    
    Set-YtDlpProject
    
    `$cmd = ".\replace_audio.ps1 -VideoFile `"`$VideoFile`" -AudioFile `"`$AudioFile`""
    
    if (`$OutputFile) {
        `$cmd += " -OutputFile `"`$OutputFile`""
    }
    
    if (`$AddWatermark) {
        `$cmd += " -AddWatermark -WatermarkText `"`$WatermarkText`""
    }
    
    Invoke-Expression `$cmd
}

function Brand-Video {
    param (
        [Parameter(Mandatory=`$true)]
        [string]`$VideoFile,
        
        [Parameter(Mandatory=`$false)]
        [string]`$OutputFile,
        
        [Parameter(Mandatory=`$false)]
        [string]`$LogoFile = "branding\logo.png",
        
        [Parameter(Mandatory=`$false)]
        [string]`$WatermarkText = "© আপনার নাম"
    )
    
    Set-YtDlpProject
    
    `$cmd = ".\brand_video.ps1 -VideoFile `"`$VideoFile`" -WatermarkText `"`$WatermarkText`""
    
    if (`$OutputFile) {
        `$cmd += " -OutputFile `"`$OutputFile`""
    }
    
    if (`$LogoFile) {
        `$logoPath = Join-Path -Path `$projectRoot -ChildPath `$LogoFile
        if (Test-Path `$logoPath) {
            `$cmd += " -LogoFile `"`$logoPath`""
        }
    }
    
    Invoke-Expression `$cmd
}

function Show-YtDlpHelp {
    Write-Host "`nYT-DLP ভিডিও ডাউনলোডার হেল্প" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    
    Write-Host "`nউপলব্ধ ফাংশন:" -ForegroundColor Yellow
    Write-Host "  Set-YtDlpProject                  - প্রজেক্ট ডিরেক্টরিতে যান"
    Write-Host "  Get-DownloadProfiles              - ডাউনলোড প্রোফাইল দেখুন"
    Write-Host "  Download-Video -Url <url>         - ভিডিও ডাউনলোড করুন"
    Write-Host "  Process-FacebookVideo -FacebookUrl <url> - ফেসবুক ভিডিও প্রসেস করুন"
    Write-Host "  Replace-VideoAudio -VideoFile <file> -AudioFile <file> - ভিডিওর অডিও প্রতিস্থাপন করুন"
    Write-Host "  Brand-Video -VideoFile <file>     - ভিডিওতে ব্র্যান্ডিং যোগ করুন"
    
    Write-Host "`nউদাহরণ:" -ForegroundColor Yellow
    Write-Host "  Download-Video -Url `"https://www.youtube.com/watch?v=dQw4w9WgXcQ`" -Profile `"best_quality`""
    Write-Host "  Process-FacebookVideo -FacebookUrl `"https://www.facebook.com/reel/697342045965410`" -BrandName `"আপনার নাম`" -OptimizeForFacebook"
}

# প্রজেক্ট ডিরেক্টরিতে যান
Set-YtDlpProject

# হেল্প দেখান
Show-YtDlpHelp
"@

$profilePath = Join-Path -Path $projectRoot -ChildPath "yt-dlp-profile.ps1"
$profileContent | Out-File -FilePath $profilePath -Encoding utf8

Write-Host "পাওয়ারশেল প্রোফাইল ফাইল তৈরি করা হয়েছে: $profilePath" -ForegroundColor Green

# ৭. সেটআপ সম্পন্ন এবং ব্যবহার নির্দেশিকা
Write-Host "`n=========================================================" -ForegroundColor Cyan
Write-Host "YT-DLP ভিডিও ডাউনলোডার সেটআপ সম্পন্ন হয়েছে!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan

Write-Host "`nপ্রজেক্ট ডিরেক্টরি: $projectRoot" -ForegroundColor Yellow

Write-Host "`nফাইল স্ট্রাকচার:" -ForegroundColor Yellow
Get-ChildItem -Path $projectRoot -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($projectRoot.Length + 1)
    Write-Host "  $relativePath"
}

Write-Host "`nব্যবহার নির্দেশিকা:" -ForegroundColor Yellow
Write-Host "১. প্রজেক্ট ডিরেক্টরিতে যান:" -ForegroundColor Cyan
Write-Host "   cd $projectRoot"

Write-Host "`n২. পাওয়ারশেল প্রোফাইল লোড করুন:" -ForegroundColor Cyan
Write-Host "   . .\yt-dlp-profile.ps1"

Write-Host "`n৩. ফেসবুক ভিডিও ডাউনলোড এবং প্রসেস করুন:" -ForegroundColor Cyan
Write-Host "   Process-FacebookVideo -FacebookUrl `"https://www.facebook.com/reel/697342045965410`" -BrandName `"আপনার নাম`" -OptimizeForFacebook"

Write-Host "`n৪. ভিডিও ডাউনলোড করুন:" -ForegroundColor Cyan
Write-Host "   Download-Video -Url `"https://www.youtube.com/watch?v=dQw4w9WgXcQ`" -Profile `"best_quality`""

Write-Host "`n৫. ডাউনলোড প্রোফাইল দেখুন:" -ForegroundColor Cyan
Write-Host "   Get-DownloadProfiles"

Write-Host "`n৬. ভিডিওর অডিও প্রতিস্থাপন করুন:" -ForegroundColor Cyan
Write-Host "   Replace-VideoAudio -VideoFile `"downloads\video.mp4`" -AudioFile `"audio-library\background-music.mp3`" -AddWatermark -WatermarkText `"© আপনার নাম`""

Write-Host "`n৭. ভিডিওতে ব্র্যান্ডিং যোগ করুন:" -ForegroundColor Cyan
Write-Host "   Brand-Video -VideoFile `"downloads\video.mp4`" -WatermarkText `"© আপনার নাম`""

Write-Host "`n৮. হেল্প দেখুন:" -ForegroundColor Cyan
Write-Host "   Show-YtDlpHelp"

Write-Host "`nসেটআপ সম্পন্ন! এখন আপনি YT-DLP ভিডিও ডাউনলোডার ব্যবহার করতে পারেন।" -ForegroundColor Green
'@

$setupScriptPath = "setup-yt-dlp.ps1"
$setupScriptContent | Out-File -FilePath $setupScriptPath -Encoding utf8

Write-Host "সেটআপ স্ক্রিপ্ট তৈরি করা হয়েছে: $setupScriptPath" -ForegroundColor Green
Write-Host "নতুন প্রজেক্ট সেটআপ করতে নিম্নলিখিত কমান্ড চালান:" -ForegroundColor Yellow
Write-Host "   .\setup-yt-dlp.ps1" -ForegroundColor Cyan

<Actions>
  <Action name="সেটআপ স্ক্রিপ্ট চালান" description="নতুন প্রজেক্ট সেটআপ করতে সেটআপ স্ক্রিপ্ট চালান" />
  <Action name="পাওয়ারশেল প্রোফাইল লোড করুন" description="প্রজেক্ট ফাংশন ব্যবহার করতে পাওয়ারশেল প্রোফাইল লোড করুন" />
  <Action name="ফেসবুক ভিডিও প্রসেস করুন" description="ফেসবুক ভিডিও ডাউনলোড এবং প্রসেস করুন" />
  <Action name="কাস্টম লোগো তৈরি করুন" description="আপনার নিজের কাস্টম লোগো তৈরি করুন" />
  <Action name="ব্যাচ প্রসেসিং সেটআপ করুন" description="একাধিক ভিডিও একসাথে প্রসেস করার জন্য ব্যাচ প্রসেসিং সেটআপ করুন" />
</Actions>

