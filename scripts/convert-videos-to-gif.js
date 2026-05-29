#!/usr/bin/env node

/**
 * Video to GIF Converter Script
 * Converts MP4 videos to optimized GIFs for web
 * Usage: node scripts/convert-videos-to-gif.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INPUT_DIR = path.join(__dirname, '../public/instagram');
const OUTPUT_DIR = path.join(__dirname, '../public/instagram');

// Configuration
const GIF_CONFIG = {
  fps: 10, // Frames per second for GIF
  maxDuration: 15, // Maximum duration in seconds (shorten if longer)
  scale: 640, // Output width (height auto)
};

/**
 * Convert video to optimized GIF
 * @param {string} inputFile - Path to input video file
 * @param {string} outputFile - Path to output GIF file
 */
function convertVideoToGif(inputFile, outputFile) {
  try {
    // Get video duration
    const durationCommand = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1:novalue=1 "${inputFile}"`;
    const durationStr = execSync(durationCommand, { encoding: 'utf-8' }).trim();
    const duration = parseFloat(durationStr);

    console.log(`\n📹 Converting: ${path.basename(inputFile)}`);
    console.log(`   Duration: ${duration.toFixed(2)}s`);

    // Use shorter duration if video is too long
    const trimDuration = Math.min(duration, GIF_CONFIG.maxDuration);
    console.log(`   Output duration: ${trimDuration}s`);

    // FFmpeg command to convert video to GIF
    // Using filters to optimize quality and size
    const ffmpegCommand = `ffmpeg -i "${inputFile}" -t ${trimDuration} -vf "fps=${GIF_CONFIG.fps},scale=${GIF_CONFIG.scale}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=sierra2_4a" -loop 0 "${outputFile}"`;

    execSync(ffmpegCommand, { stdio: 'inherit' });
    console.log(`   ✅ Created: ${path.basename(outputFile)}`);
    console.log(`   📊 File size: ${(fs.statSync(outputFile).size / 1024 / 1024).toFixed(2)}MB`);
  } catch (error) {
    console.error(`   ❌ Error converting ${path.basename(inputFile)}:`, error.message);
  }
}

/**
 * Main conversion process
 */
function main() {
  console.log('🎬 Video to GIF Converter\n');
  console.log('Configuration:');
  console.log(`  • FPS: ${GIF_CONFIG.fps}`);
  console.log(`  • Max Duration: ${GIF_CONFIG.maxDuration}s`);
  console.log(`  • Scale: ${GIF_CONFIG.scale}px\n`);

  // Check if ffmpeg and ffprobe are installed
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
    execSync('ffprobe -version', { stdio: 'pipe' });
  } catch {
    console.error(
      '❌ FFmpeg not found. Please install FFmpeg:\n' +
      '   Windows: choco install ffmpeg\n' +
      '   macOS: brew install ffmpeg\n' +
      '   Linux: sudo apt-get install ffmpeg\n'
    );
    process.exit(1);
  }

  // Find all MP4 files in instagram folder
  const files = fs.readdirSync(INPUT_DIR);
  const videoFiles = files.filter((file) => file.toLowerCase().endsWith('.mp4'));

  if (videoFiles.length === 0) {
    console.log('ℹ️ No MP4 files found in public/instagram/');
    return;
  }

  console.log(`Found ${videoFiles.length} video file(s):\n`);

  // Convert each video
  videoFiles.forEach((videoFile) => {
    const inputPath = path.join(INPUT_DIR, videoFile);
    const outputName = videoFile.replace(/\.mp4$/i, '.gif');
    const outputPath = path.join(OUTPUT_DIR, outputName);

    convertVideoToGif(inputPath, outputPath);
  });

  console.log('\n✨ Conversion complete!');
}

main();
