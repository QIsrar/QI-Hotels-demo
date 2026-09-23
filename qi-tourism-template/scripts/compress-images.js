const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'public', 'images');

async function compressImages() {
  const files = fs.readdirSync(imgDir);
  console.log('Scanning images for compression...');

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;
    const filePath = path.join(imgDir, file);
    const stat = fs.statSync(filePath);
    const sizeKB = stat.size / 1024;

    if (sizeKB > 300) {
      console.log(`Compressing ${file} (${sizeKB.toFixed(1)} KB)...`);
      const tempPath = path.join(imgDir, `_temp_${file}`);

      const image = sharp(filePath);
      const meta = await image.metadata();

      let pipeline = image;
      if (meta.width && meta.width > 1920) {
        pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
      }

      if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        await pipeline
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(tempPath);
      } else if (file.endsWith('.png')) {
        await pipeline
          .png({ compressionLevel: 9, quality: 85 })
          .toFile(tempPath);
      }

      const newStat = fs.statSync(tempPath);
      const newSizeKB = newStat.size / 1024;
      fs.renameSync(tempPath, filePath);
      console.log(`✓ ${file}: ${sizeKB.toFixed(1)} KB → ${newSizeKB.toFixed(1)} KB (Saved ${(sizeKB - newSizeKB).toFixed(1)} KB)`);
    } else {
      console.log(`- ${file} (${sizeKB.toFixed(1)} KB) is already optimal`);
    }
  }
}

compressImages().then(() => {
  console.log('All images optimized successfully!');
  process.exit(0);
}).catch(err => {
  console.error('Compression error:', err);
  process.exit(1);
});
