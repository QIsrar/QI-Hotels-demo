const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5B54F"/>
      <stop offset="100%" stop-color="#C8902A"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D5016"/>
      <stop offset="100%" stop-color="#1E3810"/>
    </linearGradient>
  </defs>
  <!-- Outer Gold Ring -->
  <circle cx="60" cy="60" r="56" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  <circle cx="60" cy="60" r="51" fill="url(#greenGrad)"/>
  
  <!-- Mountain Peaks -->
  <polygon points="60,26 84,68 36,68" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linejoin="round"/>
  <polygon points="42,42 62,76 22,76" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linejoin="round" opacity="0.75"/>

  <!-- Pine Tree in Forefront -->
  <path d="M60,40 L68,52 L64,52 L72,64 L66,64 L74,76 L62,76 L62,86 L58,86 L58,76 L46,76 L54,64 L48,64 L56,52 L52,52 Z" fill="url(#goldGrad)"/>
  
  <!-- Star -->
  <circle cx="60" cy="18" r="2.5" fill="#E5B54F"/>
</svg>`;

sharp(Buffer.from(svg))
  .resize(240, 240)
  .png()
  .toFile('public/images/logo.png')
  .then(() => {
    console.log('Logo created successfully at public/images/logo.png');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
