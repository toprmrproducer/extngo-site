#!/bin/bash

# Image optimization script for Lighthouse performance
# This script optimizes large images to reduce payload size

echo "🖼️  Optimizing images for better Lighthouse scores..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Install it with:"
    echo "   Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "   macOS: brew install imagemagick"
    echo "   Or use online tools to compress images manually"
    exit 1
fi

# Optimize large webp files
echo "Compressing large WebP images..."

for img in public/*.webp; do
    if [ -f "$img" ]; then
        size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        size_mb=$((size / 1024 / 1024))
        
        if [ $size_mb -gt 1 ]; then
            echo "  Optimizing $img (${size_mb}MB)..."
            convert "$img" -quality 85 -define webp:method=6 "${img}.tmp"
            mv "${img}.tmp" "$img"
        fi
    fi
done

# Optimize product images
echo "Optimizing product images..."
if [ -f "public/product-blue.png" ]; then
    echo "  Resizing product-blue.png..."
    convert public/product-blue.png -resize 800x800 -quality 85 public/product-blue.png
fi

if [ -f "public/product-reel.png" ]; then
    echo "  Optimizing product-reel.png..."
    convert public/product-reel.png -quality 90 public/product-reel.png
fi

echo "✅ Image optimization complete!"
echo ""
echo "📊 Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Check image sizes in public/ folder"
echo "3. Deploy and re-run Lighthouse"
