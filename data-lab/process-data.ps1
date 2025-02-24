param (
    [string]$name,
    [string]$email,
    [string]$message
)

$data = "Name: $name`nEmail: $email`nMessage: $message`nTimestamp: $(Get-Date).ToString('yyyy-MM-dd HH:mm:ss')`n`n"

$data | Out-File -Append -FilePath "submit-data.txt"
Write-Output "Data processed and saved successfully."
