I'll create a Python script that utilizes yt-dlp to download videos with original quality preserved and includes functionality to remove static watermarks using ffmpeg. Also implement a JSON configuration system for flexible download commands.

```typescriptreact project="yt_dlp_downloader"
...
```

Now, let's create the actual Python script that will handle the video downloading and watermark removal:

```python project="YT-DLP Downloader" file="yt_dlp_downloader.py"
...
```

Let's also create a sample configuration file:

```json project="YT-DLP Downloader" file="config.json"
...
```

I found some issues in the code block.

- Minus must be followed by a digit


I will fix them.

```json project="YT-DLP Downloader" file="config.json"
...
```

Now let's create a PowerShell script alternative for Windows users:

```powershell project="YT-DLP Downloader" file="yt_dlp_downloader.ps1"
...
```

## Usage Instructions

### Python Script Usage

1. **Installation**:

```shellscript
pip install yt-dlp
# Make sure ffmpeg and ffprobe are installed on your system
```


2. **Basic Download**:

```shellscript
python yt_dlp_downloader.py download "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```


3. **Download with a Specific Profile**:

```shellscript
python yt_dlp_downloader.py download "https://www.youtube.com/watch?v=dQw4w9WgXcQ" --profile preserve_all
```


4. **Remove Watermark**:

```shellscript
python yt_dlp_downloader.py remove-watermark "video.mp4" 10 10 100 50
```


5. **List Available Profiles**:

```shellscript
python yt_dlp_downloader.py list-profiles
```


6. **Add a New Profile**:

```shellscript
python yt_dlp_downloader.py add-profile "720p" "Download 720p video" "--format bestvideo[height<=720]+bestaudio/best[height<=720] --merge-output-format mp4"
```




### PowerShell Script Usage

1. **Basic Download**:

```powershell
.\yt_dlp_downloader.ps1 -Command download -Url "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```


2. **Download with a Specific Profile**:

```powershell
.\yt_dlp_downloader.ps1 -Command download -Url "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -Profile "preserve_all"
```


3. **Remove Watermark**:

```powershell
.\yt_dlp_downloader.ps1 -Command remove-watermark -VideoFile "video.mp4" -X 10 -Y 10 -Width 100 -Height 50
```


4. **List Available Profiles**:

```powershell
.\yt_dlp_downloader.ps1 -Command list-profiles
```


5. **Add a New Profile**:

```powershell
.\yt_dlp_downloader.ps1 -Command add-profile -ProfileName "720p" -Description "Download 720p video" -CommandOptions "--format bestvideo[height<=720]+bestaudio/best[height<=720] --merge-output-format mp4"
```




The scripts provide a flexible way to download videos while preserving their original quality and removing watermarks. The configuration file allows you to customize download profiles for different use cases.