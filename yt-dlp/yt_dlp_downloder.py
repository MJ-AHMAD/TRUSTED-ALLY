#!/usr/bin/env python3
"""
YT-DLP Video Downloader with Watermark Removal

This script uses yt-dlp to download videos while preserving original quality
and provides functionality to remove static watermarks using ffmpeg.
"""

import os
import sys
import json
import argparse
import subprocess
import shutil
import tempfile
from pathlib import Path

# Configuration file path
CONFIG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.json')

def create_default_config():
    """Create a default configuration file if none exists."""
    default_config = {
        "ffmpeg_path": "ffmpeg",
        "ffprobe_path": "ffprobe",
        "output_dir": "downloads",
        "output_template": "%(title)s [%(id)s].%(ext)s",
        "download_profiles": [
            {
                "name": "best_quality",
                "description": "Download best quality video and audio",
                "command": "--format bestvideo+bestaudio/best --merge-output-format mp4"
            },
            {
                "name": "audio_only",
                "description": "Extract audio only in mp3 format",
                "command": "-x --audio-format mp3 --audio-quality 0"
            }
        ]
    }
    
    with open(CONFIG_FILE, 'w') as f:
        json.dump(default_config, f, indent=4)
    
    return default_config

def load_config():
    """Load configuration from JSON file."""
    if not os.path.exists(CONFIG_FILE):
        print(f"Configuration file not found. Creating default at {CONFIG_FILE}")
        return create_default_config()
    
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        print(f"Error parsing configuration file. Using default configuration.")
        return create_default_config()

def save_config(config):
    """Save configuration to JSON file."""
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=4)

def check_dependencies(config):
    """Check if required dependencies are installed."""
    # Check for yt-dlp
    try:
        subprocess.run(["yt-dlp", "--version"], capture_output=True, text=True, check=True)
    except (subprocess.SubprocessError, FileNotFoundError):
        print("Error: yt-dlp is not installed or not in PATH.")
        print("Please install it using: pip install yt-dlp")
        return False
    
    # Check for ffmpeg
    ffmpeg_path = config.get("ffmpeg_path", "ffmpeg")
    try:
        subprocess.run([ffmpeg_path, "-version"], capture_output=True, text=True, check=True)
    except (subprocess.SubprocessError, FileNotFoundError):
        print(f"Error: ffmpeg is not installed or not found at {ffmpeg_path}")
        print("Please install ffmpeg and update the path in the configuration file.")
        return False
    
    # Check for ffprobe
    ffprobe_path = config.get("ffprobe_path", "ffprobe")
    try:
        subprocess.run([ffprobe_path, "-version"], capture_output=True, text=True, check=True)
    except (subprocess.SubprocessError, FileNotFoundError):
        print(f"Error: ffprobe is not installed or not found at {ffprobe_path}")
        print("Please install ffprobe and update the path in the configuration file.")
        return False
    
    return True

def download_video(url, profile_name=None, output_dir=None, output_template=None, config=None):
    """Download video using yt-dlp with specified profile."""
    if config is None:
        config = load_config()
    
    if not output_dir:
        output_dir = config.get("output_dir", "downloads")
    
    if not output_template:
        output_template = config.get("output_template", "%(title)s [%(id)s].%(ext)s")
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Build command
    cmd = ["yt-dlp"]
    
    # Add profile command if specified
    if profile_name:
        profile_cmd = None
        for profile in config.get("download_profiles", []):
            if profile["name"] == profile_name:
                profile_cmd = profile["command"]
                break
        
        if profile_cmd:
            cmd.extend(profile_cmd.split())
        else:
            print(f"Warning: Profile '{profile_name}' not found. Using default settings.")
    
    # Add output template
    cmd.extend(["-o", os.path.join(output_dir, output_template)])
    
    # Add URL
    cmd.append(url)
    
    print(f"Executing command: {' '.join(cmd)}")
    
    # Run yt-dlp
    try:
        process = subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(process.stdout)
        
        # Extract filename from output
        for line in process.stdout.splitlines():
            if "[download] Destination:" in line:
                filename = line.split("[download] Destination:", 1)[1].strip()
                return filename
        
        # If we couldn't find the filename in the output, try to guess it
        return None
    except subprocess.CalledProcessError as e:
        print(f"Error downloading video: {e}")
        print(e.stderr)
        return None

def remove_watermark(video_file, x, y, width, height, config=None):
    """Remove static watermark from video using ffmpeg."""
    if config is None:
        config = load_config()
    
    ffmpeg_path = config.get("ffmpeg_path", "ffmpeg")
    
    # Create a temporary file for the processed video
    temp_dir = tempfile.gettempdir()
    temp_output = os.path.join(temp_dir, f"nowatermark_{os.path.basename(video_file)}")
    
    # Build ffmpeg command to remove watermark
    # We use the delogo filter to remove the watermark
    cmd = [
        ffmpeg_path,
        "-i", video_file,
        "-vf", f"delogo=x={x}:y={y}:w={width}:h={height}:show=0",
        "-c:a", "copy",  # Copy audio stream without re-encoding
        "-c:v", "libx264",  # Use H.264 codec for video
        "-preset", "medium",  # Balance between quality and encoding speed
        "-crf", "18",  # High quality (lower value = higher quality)
        temp_output
    ]
    
    print(f"Removing watermark with command: {' '.join(cmd)}")
    
    try:
        subprocess.run(cmd, check=True)
        
        # Replace original file with processed file
        shutil.move(temp_output, video_file)
        print(f"Watermark removed successfully from {video_file}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error removing watermark: {e}")
        return False

def list_profiles(config=None):
    """List all available download profiles."""
    if config is None:
        config = load_config()
    
    profiles = config.get("download_profiles", [])
    
    if not profiles:
        print("No download profiles found.")
        return
    
    print("\nAvailable download profiles:")
    print("-" * 50)
    for i, profile in enumerate(profiles, 1):
        print(f"{i}. {profile['name']}")
        print(f"   Description: {profile['description']}")
        print(f"   Command: {profile['command']}")
        print()

def add_profile(name, description, command, config=None):
    """Add a new download profile."""
    if config is None:
        config = load_config()
    
    # Check if profile with the same name already exists
    for profile in config.get("download_profiles", []):
        if profile["name"] == name:
            print(f"Error: Profile '{name}' already exists.")
            return False
    
    # Add new profile
    new_profile = {
        "name": name,
        "description": description,
        "command": command
    }
    
    if "download_profiles" not in config:
        config["download_profiles"] = []
    
    config["download_profiles"].append(new_profile)
    save_config(config)
    
    print(f"Profile '{name}' added successfully.")
    return True

def main():
    """Main function to parse arguments and execute commands."""
    parser = argparse.ArgumentParser(description="YT-DLP Video Downloader with Watermark Removal")
    
    # Create subparsers for different commands
    subparsers = parser.add_subparsers(dest="command", help="Command to execute")
    
    # Download command
    download_parser = subparsers.add_parser("download", help="Download a video")
    download_parser.add_argument("url", help="URL of the video to download")
    download_parser.add_argument("-p", "--profile", help="Download profile to use")
    download_parser.add_argument("-o", "--output-dir", help="Output directory")
    download_parser.add_argument("-t", "--output-template", help="Output filename template")
    
    # Watermark removal command
    watermark_parser = subparsers.add_parser("remove-watermark", help="Remove watermark from video")
    watermark_parser.add_argument("video", help="Path to the video file")
    watermark_parser.add_argument("x", type=int, help="X coordinate of watermark")
    watermark_parser.add_argument("y", type=int, help="Y coordinate of watermark")
    watermark_parser.add_argument("width", type=int, help="Width of watermark")
    watermark_parser.add_argument("height", type=int, help="Height of watermark")
    
    # Profile management commands
    list_parser = subparsers.add_parser("list-profiles", help="List all download profiles")
    
    add_profile_parser = subparsers.add_parser("add-profile", help="Add a new download profile")
    add_profile_parser.add_argument("name", help="Name of the profile")
    add_profile_parser.add_argument("description", help="Description of the profile")
    add_profile_parser.add_argument("command", help="yt-dlp command options")
    
    # Parse arguments
    args = parser.parse_args()
    
    # Load configuration
    config = load_config()
    
    # Check dependencies
    if not check_dependencies(config):
        sys.exit(1)
    
    # Execute command
    if args.command == "download":
        filename = download_video(
            args.url, 
            args.profile, 
            args.output_dir, 
            args.output_template, 
            config
        )
        if filename:
            print(f"Video downloaded successfully: {filename}")
        else:
            print("Failed to download video.")
    
    elif args.command == "remove-watermark":
        success = remove_watermark(
            args.video,
            args.x,
            args.y,
            args.width,
            args.height,
            config
        )
        if not success:
            sys.exit(1)
    
    elif args.command == "list-profiles":
        list_profiles(config)
    
    elif args.command == "add-profile":
        success = add_profile(
            args.name,
            args.description,
            args.command,
            config
        )
        if not success:
            sys.exit(1)
    
    else:
        parser.print_help()

if __name__ == "__main__":
    main()