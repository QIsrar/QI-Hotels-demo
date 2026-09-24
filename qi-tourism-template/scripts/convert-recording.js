const sharp = require('sharp');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = process.env.FFMPEG_PATH || 'C:/Users/Qazi Israr/.gemini/antigravity-ide/brain/15287b58-c893-4a25-96a6-f276348ae85b/scratch/node_modules/ffmpeg-static/ffmpeg.exe';
const inputWebp = process.argv[2] || 'C:/Users/Qazi Israr/.gemini/antigravity-ide/brain/15287b58-c893-4a25-96a6-f276348ae85b/live_walkthrough_1790236205483.webp';
const docsDir = path.join(__dirname, '../../docs');
const outputMp4 = path.join(docsDir, 'demo-video.mp4');
const outputGif = path.join(docsDir, 'demo-preview.gif');

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

async function run() {
  console.log('Reading WebP info...');
  const meta = await sharp(inputWebp, { animated: false }).metadata();
  const totalFrames = meta.pages;
  console.log(`Total frames: ${totalFrames}`);

  const cropX = 36;
  const cropY = 12;
  const cropW = 1845;
  const cropH = 970;
  const fps = 15; // 834 frames / 15 = 55.6 seconds smooth playback

  console.log(`Starting FFmpeg 1080p encode -> ${outputMp4}...`);
  const ffmpeg = spawn(ffmpegPath, [
    '-y',
    '-f', 'rawvideo',
    '-pix_fmt', 'rgba',
    '-s', `${cropW}x${cropH}`,
    '-r', `${fps}`,
    '-i', '-',
    '-vf', 'scale=1920:1080:flags=lanczos',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-level', '4.2',
    '-preset', 'fast',
    '-crf', '17', // High quality, crisp text
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    outputMp4
  ]);

  ffmpeg.stderr.on('data', d => {
    const s = d.toString();
    if (s.includes('frame=')) process.stdout.write(`\r${s.trim()}`);
  });

  const batchSize = 50;
  const frameBuf = Buffer.allocUnsafe(cropW * cropH * 4);

  for (let start = 0; start < totalFrames; start += batchSize) {
    const count = Math.min(batchSize, totalFrames - start);
    process.stdout.write(`\nDecoding frames ${start + 1}..${start + count}/${totalFrames}... `);
    const { data } = await sharp(inputWebp, { page: start, pages: count, limitInputPixels: false })
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let f = 0; f < count; f++) {
      for (let r = 0; r < cropH; r++) {
        const srcOffset = ((f * 994 + cropY + r) * 1920 + cropX) * 4;
        data.copy(frameBuf, r * cropW * 4, srcOffset, srcOffset + cropW * 4);
      }
      await writeToStdin(ffmpeg.stdin, frameBuf);
    }
  }

  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited code ${code}`));
    });
  });

  const stat = fs.statSync(outputMp4);
  console.log(`\n✅ Created true 1080p MP4: ${(stat.size / (1024 * 1024)).toFixed(2)} MB`);

  console.log(`Generating optimized preview GIF -> ${outputGif}...`);
  const gifProcess = spawn(ffmpegPath, [
    '-y',
    '-i', outputMp4,
    '-vf', 'fps=8,scale=560:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=64[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5',
    outputGif
  ]);

  await new Promise((resolve, reject) => {
    gifProcess.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg GIF exited code ${code}`));
    });
  });

  const gifStat = fs.statSync(outputGif);
  console.log(`✅ Created preview GIF: ${(gifStat.size / (1024 * 1024)).toFixed(2)} MB`);
}

run().catch(console.error);
