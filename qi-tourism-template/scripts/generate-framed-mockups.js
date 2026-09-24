const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = process.env.SRC_DIR || process.argv[2] || path.join(__dirname, 'raw-screens');
const outDir = path.join(__dirname, '../public/readme-assets');
const docsDir = path.join(__dirname, '../../docs');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

function createBrowserChromeSvg(width, title = 'qi-hotels.vercel.app') {
  const height = 44;
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F8FAFC" />
          <stop offset="100%" stop-color="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#chromeGrad)" rx="10" ry="10" />
      <rect y="${height - 10}" width="${width}" height="10" fill="#E2E8F0" />
      <!-- Window Controls -->
      <circle cx="20" cy="22" r="6" fill="#EF4444" />
      <circle cx="38" cy="22" r="6" fill="#F59E0B" />
      <circle cx="56" cy="22" r="6" fill="#10B981" />
      <!-- URL Bar -->
      <rect x="180" y="8" width="${width - 360}" height="28" rx="6" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1" />
      <text x="${width / 2}" y="26" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="#64748B" text-anchor="middle" font-weight="500">
        🔒 https://${title}
      </text>
    </svg>
  `);
}

function createPhoneOverlaySvg(width, height, screenX, screenY, screenWidth, screenHeight) {
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Border / Bezel line -->
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="44" ry="44" fill="none" stroke="#475569" stroke-width="3" />
      <!-- Dynamic Island -->
      <rect x="${width / 2 - 45}" y="${screenY + 10}" width="90" height="22" rx="11" fill="#000000" />
      <circle cx="${width / 2 + 25}" cy="${screenY + 21}" r="3.5" fill="#1E293B" />
      <!-- Home indicator bar -->
      <rect x="${width / 2 - 50}" y="${height - screenY - 10}" width="100" height="4" rx="2" fill="#FFFFFF" opacity="0.75" />
    </svg>
  `);
}

async function frameDesktop(srcFilename, outFilename, url = 'qi-hotels.vercel.app') {
  const srcPath = path.join(srcDir, srcFilename);
  const targetWidth = 1200;
  const headerHeight = 44;

  const imageMeta = await sharp(srcPath).metadata();
  const scaledHeight = Math.round((imageMeta.height / imageMeta.width) * targetWidth);
  const totalHeight = headerHeight + scaledHeight;

  const resizedScreenshot = await sharp(srcPath)
    .resize(targetWidth, scaledHeight)
    .toBuffer();

  const chromeSvg = createBrowserChromeSvg(targetWidth, url);

  const canvas = sharp({
    create: {
      width: targetWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    }
  });

  const finalBuffer = await canvas
    .composite([
      { input: chromeSvg, top: 0, left: 0 },
      { input: resizedScreenshot, top: headerHeight, left: 0 }
    ])
    .png({ quality: 85, compressionLevel: 9 })
    .toBuffer();

  const outPath1 = path.join(outDir, outFilename);
  const outPath2 = path.join(docsDir, outFilename);
  fs.writeFileSync(outPath1, finalBuffer);
  fs.writeFileSync(outPath2, finalBuffer);

  console.log(`Saved ${outFilename}: ${(finalBuffer.length / 1024).toFixed(1)} KB`);
}

async function frameMobile(srcFilename, outFilename) {
  const srcPath = path.join(srcDir, srcFilename);
  const phoneWidth = 420;
  const screenX = 14;
  const screenY = 16;
  const screenWidth = phoneWidth - screenX * 2; // 392
  const screenHeight = Math.round(screenWidth * (812 / 375)); // ~849
  const phoneHeight = screenHeight + screenY * 2; // ~881

  // Cut rounded corners on the screen
  const roundedCornersSvg = Buffer.from(`
    <svg width="${screenWidth}" height="${screenHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${screenWidth}" height="${screenHeight}" rx="32" ry="32" fill="#FFFFFF" />
    </svg>
  `);

  const resizedScreen = await sharp(srcPath)
    .resize(screenWidth, screenHeight, { fit: 'cover', position: 'top' })
    .composite([{ input: roundedCornersSvg, blend: 'dest-in' }])
    .toBuffer();

  const phoneOverlay = createPhoneOverlaySvg(phoneWidth, phoneHeight, screenX, screenY, screenWidth, screenHeight);

  const phoneBodySvg = Buffer.from(`
    <svg width="${phoneWidth}" height="${phoneHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${phoneWidth}" height="${phoneHeight}" rx="46" ry="46" fill="#0F172A" />
    </svg>
  `);

  const finalBuffer = await sharp(phoneBodySvg)
    .composite([
      { input: resizedScreen, top: screenY, left: screenX },
      { input: phoneOverlay, top: 0, left: 0 }
    ])
    .png({ quality: 85, compressionLevel: 9 })
    .toBuffer();

  const outPath1 = path.join(outDir, outFilename);
  const outPath2 = path.join(docsDir, outFilename);
  fs.writeFileSync(outPath1, finalBuffer);
  fs.writeFileSync(outPath2, finalBuffer);

  console.log(`Saved ${outFilename}: ${(finalBuffer.length / 1024).toFixed(1)} KB`);
}

async function run() {
  console.log('Generating device-framed mockups from live production screenshots...');
  await frameDesktop('hero_desktop_1790236318970.png', 'preview-hero.png', 'qi-hotels.vercel.app');
  await frameDesktop('rooms_desktop_1790236651239.png', 'preview-rooms.png', 'qi-hotels.vercel.app/#rooms');
  await frameDesktop('gallery_lightbox_desktop_1790236501278.png', 'preview-gallery.png', 'qi-hotels.vercel.app/#gallery');
  await frameDesktop('booking_wizard_desktop_1790237624155.png', 'preview-booking.png', 'qi-hotels.vercel.app/?booking=open');
  await frameDesktop('footer_desktop_1790238454969.png', 'preview-footer.png', 'qi-hotels.vercel.app/#contact');
  await frameMobile('hero_mobile_1790238790998.png', 'preview-mobile.png');
  console.log('Done!');
}

run().catch(console.error);
