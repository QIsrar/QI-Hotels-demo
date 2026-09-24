const sharp = require('sharp');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
const inputWebp = process.argv[2] || path.join(__dirname, 'recording.webp');
const docsDir = path.join(__dirname, '../../docs');
const outputMp4 = path.join(docsDir, 'demo-video.mp4');
const outputGif = path.join(docsDir, 'demo-preview.gif');

if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

function writeToStdin(stream, buffer) {
  return new Promise((resolve, reject) => {
    if (stream.write(buffer)) {
      resolve();
    } else {
      stream.once('drain', resolve);
      stream.once('error', reject);
    }
  });
}

async function convertWebpToMp4() {
  console.log('Reading input WebP metadata...');
  const meta = await sharp(inputWebp, { animated: true, limitInputPixels: false }).metadata();
  console.log(`Total frames: ${meta.pages}, Size: ${meta.width}x994`);

  const width = meta.width;
  const height = 994;
  const totalFrames = meta.pages;

  console.log(`Spawning FFmpeg to encode 1080p H.264 MP4 -> ${outputMp4}...`);
  const ffmpeg = spawn(ffmpegPath, [
    '-y',
    '-f', 'rawvideo',
    '-pix_fmt', 'rgba',
    '-s', `${width}x${height}`,
    '-r', '10', // 10 fps
    '-i', '-',
    // Pad to standard 1920x1080
    '-vf', 'pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black',
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '22',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputMp4
  ]);

  ffmpeg.stderr.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('frame=')) {
      process.stdout.write(`\r${msg.trim()}`);
    }
  });

  for (let i = 0; i < totalFrames; i++) {
    const rawBuffer = await sharp(inputWebp, { page: i, limitInputPixels: false }).raw().toBuffer();
    await writeToStdin(ffmpeg.stdin, rawBuffer);
    if (i % 50 === 0 || i === totalFrames - 1) {
      process.stdout.write(`\rProcessed ${i + 1}/${totalFrames} frames...`);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  const stat = fs.statSync(outputMp4);
  console.log(`\nSuccessfully created 1080p MP4: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);

  // Now create compressed preview GIF for README
  console.log(`Generating compressed preview GIF -> ${outputGif}...`);
  const gifProcess = spawn(ffmpegPath, [
    '-y',
    '-i', outputMp4,
    '-vf', 'fps=8,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
    outputGif
  ]);

  await new Promise((resolve, reject) => {
    gifProcess.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg GIF exited with code ${code}`));
    });
  });

  const gifStat = fs.statSync(outputGif);
  console.log(`Successfully created preview GIF: ${(gifStat.size / (1024 * 1024)).toFixed(2)} MB`);

  // Also copy to template public/readme-assets
  const templateReadmeAssets = path.join(__dirname, '../public/readme-assets');
  fs.copyFileSync(outputMp4, path.join(templateReadmeAssets, 'demo-video.mp4'));
  fs.copyFileSync(outputGif, path.join(templateReadmeAssets, 'demo-preview.gif'));
  console.log('Copied assets to template public/readme-assets folder.');
}

convertWebpToMp4().catch(console.error);
