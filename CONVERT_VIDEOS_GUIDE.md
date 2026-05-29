# Video to GIF Conversion Guide

This guide explains how to convert video files to optimized GIFs for the Warkop Azzahra website.

## Prerequisites

You need to have FFmpeg installed on your system. FFmpeg is a powerful multimedia framework that can decode, encode, transcode, mux, demux, stream, filter and play any media.

### Installation

**Windows:**
```bash
# Using Chocolatey
choco install ffmpeg

# Or using Windows Package Manager
winget install ffmpeg

# Or download from: https://ffmpeg.org/download.html
```

**macOS:**
```bash
# Using Homebrew
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

## How to Use

### 1. Place Your Video Files

Put your MP4 video files in the `public/instagram/` directory:
```
public/instagram/
├── feeds_video.mp4
├── feeds1.png
├── feeds2.png
└── ... other feeds
```

### 2. Run the Conversion Script

From the project root directory, run:
```bash
node scripts/convert-videos-to-gif.js
```

### 3. Configuration

You can customize the GIF output by editing the `GIF_CONFIG` object in `scripts/convert-videos-to-gif.js`:

```javascript
const GIF_CONFIG = {
  fps: 10,                    // Frames per second (lower = smaller file, choppier)
  maxDuration: 15,            // Maximum duration in seconds (videos longer than this will be trimmed)
  scale: 640,                 // Output width in pixels (height auto-scales)
};
```

**Recommendations:**
- **fps: 8-12** - Good balance between file size and smoothness
- **maxDuration: 10-15** - Short, punchy videos work best as GIFs
- **scale: 480-720** - Adjust based on detail level needed

### 4. Update InstagramFeed Component

Once GIFs are created, they'll be automatically picked up if you add them to the feed data:

```typescript
const posts = [
  { 
    id: 7, 
    url: '/instagram/feeds_video.gif', 
    likes: '156', 
    comments: '42', 
    type: 'video-gif',  // Use 'video-gif' type for animated GIFs
    link: 'https://www.instagram.com/warkopsop_azzahra/',
    title: 'Moment Azzahra'
  },
  // ... other posts
];
```

## File Size Optimization

GIF files can be large. Here are tips to optimize file size:

1. **Reduce Duration**: Keep videos under 15 seconds
2. **Lower Frame Rate**: Use fps: 8-10 for smaller files
3. **Reduce Scale**: 480-640px is usually sufficient for web
4. **Compress**: Use tools like `gifsicle` for further compression:
   ```bash
   npm install -g gifsicle
   gifsicle --colors 256 -O3 input.gif -o output.gif
   ```

## Troubleshooting

**Error: "FFmpeg not found"**
- Make sure FFmpeg is installed and added to your system PATH
- Restart your terminal after installation

**GIF plays too fast or slow**
- Adjust the `fps` value in the config
- Higher fps = faster playback but larger file size

**GIF file is too large**
- Reduce `fps` (e.g., from 10 to 8)
- Reduce `scale` (e.g., from 640 to 480)
- Reduce `maxDuration`
- Use `gifsicle` for post-processing compression

**Video is cut off**
- Increase `maxDuration` if your video is longer than 15 seconds

## Adding GIFs to the Website

Once you have GIF files:

1. Place them in `public/instagram/`
2. Add entries to the posts array in `src/features/home/sections/InstagramFeed.tsx`
3. Use `type: 'video-gif'` for GIF posts
4. Commit and push to GitHub

Example:
```typescript
{ 
  id: 7, 
  url: '/instagram/feeds_video.gif', 
  likes: '156', 
  comments: '42', 
  type: 'video-gif',
  link: 'https://www.instagram.com/warkopsop_azzahra/'
}
```

## Advanced: Batch Processing

To convert multiple videos at once, the script automatically detects all `.mp4` files in `public/instagram/` and converts them to GIFs.

## Performance Tips

- GIFs autoplay and loop natively in browsers
- They're cached by browsers, so subsequent page loads are fast
- Keep GIFs under 5-10 MB for optimal web performance
- Consider using WebP format for even better compression (requires additional tools)

---

For questions or issues, check FFmpeg documentation: https://ffmpeg.org/documentation.html
