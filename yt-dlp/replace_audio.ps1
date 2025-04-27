@"
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
    [string]`$WatermarkText = "© আপনার নাম",
    
    [Parameter(Mandatory=`$false)]
    [string]`$WatermarkPosition = "bottomright"
)

# কনফিগারেশন লোড করুন
`$scriptPath = Split-Path -Parent `$MyInvocation.MyCommand.Path
`$configFile = Join-Path -Path `$scriptPath -ChildPath "config.json"
`$config = Get-Content -Path `$configFile -Raw | ConvertFrom-Json

# FFmpeg পাথ নির্ধারণ করুন
`$ffmpegPath = `$config.ffmpeg_path
if (-not `$ffmpegPath) {
    `$ffmpegPath = "ffmpeg"
}

# আউটপুট ফাইল নাম নির্ধারণ করুন
if (-not `$OutputFile) {
    `$directory = [System.IO.Path]::GetDirectoryName(`$VideoFile)
    `$filename = [System.IO.Path]::GetFileNameWithoutExtension(`$VideoFile)
    `$extension = [System.IO.Path]::GetExtension(`$VideoFile)
    `$OutputFile = Join-Path -Path `$directory -ChildPath "`$(`$filename)_edited`$(`$extension)"
}

# ওয়াটারমার্ক পজিশন ম্যাপিং
`$positionMap = @{
    "topleft" = "10:10";
    "topright" = "W-tw-10:10";
    "bottomleft" = "10:H-th-10";
    "bottomright" = "W-tw-10:H-th-10";
    "center" = "(W-tw)/2:(H-th)/2"
}

`$position = `$positionMap[`$WatermarkPosition]
if (-not `$position) {
    `$position = `$positionMap["bottomright"]
}

# কমান্ড তৈরি করুন
if (`$AddWatermark) {
    # অডিও প্রতিস্থাপন এবং ওয়াটারমার্ক যোগ করুন
    `$cmd = "`$ffmpegPath -i \"`$VideoFile\" -i \"`$AudioFile\" -map 0:v -map 1:a -c:v libx264 -c:a aac -shortest -vf \"drawtext=text='`$WatermarkText':fontcolor=white:fontsize=24:box=1:boxcolor=black@0.5:boxborderw=5:x=`$position\" \"`$OutputFile\""
} else {
    # শুধু অডিও প্রতিস্থাপন করুন
    `$cmd = "`$ffmpegPath -i \"`$VideoFile\" -i \"`$AudioFile\" -map 0:v -map 1:a -c:v copy -c:a aac -shortest \"`$OutputFile\""
}

Write-Host "কমান্ড চালানো হচ্ছে: `$cmd"
Invoke-Expression `$cmd

if (Test-Path `$OutputFile) {
    Write-Host "সফলভাবে ভিডিও প্রস্তুত করা হয়েছে: `$OutputFile"
} else {
    Write-Host "ভিডিও প্রস্তুত করতে সমস্যা হয়েছে।"
}
"@ | Out-File -FilePath "replace_audio.ps1" -Encoding utf8