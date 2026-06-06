#!/bin/bash

# Video optimization script for testimonial videos
# Reduces file size while maintaining quality for web playback

echo "🎬 Optimizing testimonial videos..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed. Please install it first:"
    echo "   Ubuntu/Debian: sudo apt install ffmpeg"
    echo "   macOS: brew install ffmpeg"
    exit 1
fi

# Create backup directory
mkdir -p public/video-backups

# Optimize each video
for video in public/review*.mp4; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        backup="public/video-backups/$filename"
        temp="public/temp_$filename"
        
        echo "Processing $filename..."
        
        # Backup original
        if [ ! -f "$backup" ]; then
            cp "$video" "$backup"
            echo "  ✓ Backed up to video-backups/"
        fi
        
        # Optimize: reduce resolution to 720p, compress with H.264
        ffmpeg -i "$video" \
            -vf "scale=-2:720" \
            -c:v libx264 \
            -crf 28 \
            -preset medium \
            -c:a aac \
            -b:a 128k \
            -movflags +faststart \
            -y "$temp" 2>&1 | grep -E "Duration|size="
        
        # Replace original with optimized version
        if [ -f "$temp" ]; then
            mv "$temp" "$video"
            
            # Show size comparison
            original_size=$(du -h "$backup" | cut -f1)
            new_size=$(du -h "$video" | cut -f1)
            echo "  ✓ Optimized: $original_size → $new_size"
        else
            echo "  ❌ Failed to optimize $filename"
        fi
        
        echo ""
    fi
done

echo "✅ Video optimization complete!"
echo "Original videos backed up in public/video-backups/"
