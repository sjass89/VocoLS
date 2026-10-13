import opentype from 'opentype.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontBoldBuffer = fs.readFileSync(path.resolve(__dirname, '../Montserrat-Bold.ttf'));
const fontSemiBuffer = fs.readFileSync(path.resolve(__dirname, '../Montserrat-SemiBold.ttf'));

const fontBold = opentype.parse(fontBoldBuffer.buffer);
const fontSemi = opentype.parse(fontSemiBuffer.buffer);

const fontSize = 112;
const baseY = 126;

// Adjust spacing
const pathVoco = fontBold.getPath('Voco', 32, baseY, fontSize);
const vocoBox = pathVoco.getBoundingBox();

const pathR = fontBold.getPath('R', vocoBox.x2 + 10, baseY, fontSize);
const rBox = pathR.getBoundingBox();

const pathX = fontBold.getPath('x', rBox.x2 + 2, baseY, fontSize);
const xBox = pathX.getBoundingBox();

console.log('xBox:', xBox);
const xCenterY = (xBox.y1 + xBox.y2) / 2;
console.log('xCenterY:', xCenterY);

// Tagline
const tagline = 'VOICE AI FOR PHARMACIES';
const tagSize = 16.5;
const tagLetterSpacing = 5.6;
let curX = 0;
for (const char of tagline) {
  if (char === ' ') {
    curX += 16;
    continue;
  }
  curX += fontSemi.getAdvanceWidth(char, tagSize) + tagLetterSpacing;
}
const tagTotalWidth = curX - tagLetterSpacing;
const logoTotalWidth = xBox.x2 - 32;
const tagOffsetX = 32 + (logoTotalWidth - tagTotalWidth) / 2;

let tagPathsOffset = [];
curX = tagOffsetX;
for (const char of tagline) {
  if (char === ' ') {
    curX += 16;
    continue;
  }
  const p = fontSemi.getPath(char, curX, 172, tagSize);
  tagPathsOffset.push(p.toPathData(2));
  curX += fontSemi.getAdvanceWidth(char, tagSize) + tagLetterSpacing;
}

// Crossbar coordinates:
// Spans horizontally across the center of X, starting from the lower-right leg of R
const barX1 = rBox.x2 - 12;
const barX2 = xBox.x2 + 12;
const barWidth = barX2 - barX1;
const barHeight = 9.5;
const barY = xCenterY - (barHeight / 2);

console.log('Bar dimensions:', { barX1, barY, barWidth, barHeight });

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 615 206" width="100%" height="100%">
  <defs>
    <!-- Brand Cyan Gradient for Voco and Crossbar -->
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1DE9B6" />
      <stop offset="50%" stop-color="#00E5FF" />
      <stop offset="100%" stop-color="#00B0FF" />
    </linearGradient>

    <!-- Crossbar Horizontal Gradient -->
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1DE9B6" stop-opacity="0.95" />
      <stop offset="45%" stop-color="#00E5FF" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.6" />
    </linearGradient>

    <!-- Subtle Glow -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g id="vocorx-logo">
    <!-- Voco (Pure Vector Path) -->
    <path d="${pathVoco.toPathData(2)}" fill="url(#brandGrad)" />

    <!-- R (Pure Vector Path) -->
    <path d="${pathR.toPathData(2)}" fill="#FFFFFF" />

    <!-- x (Pure Vector Path) -->
    <path d="${pathX.toPathData(2)}" fill="#FFFFFF" />

    <!-- Horizontal Rx Crossbar (Centered exactly across the X intersection) -->
    <rect 
      x="${barX1.toFixed(1)}" 
      y="${barY.toFixed(1)}" 
      width="${barWidth.toFixed(1)}" 
      height="${barHeight.toFixed(1)}" 
      rx="2" 
      fill="url(#barGrad)" 
      filter="url(#glow)"
    />

    <!-- Tagline: VOICE AI FOR PHARMACIES (Pure Vector Path) -->
    <path d="${tagPathsOffset.join(' ')}" fill="#A1B0C2" />
  </g>
</svg>
`;

fs.writeFileSync(path.resolve(__dirname, '../public/vocorx-logo.svg'), svgContent.trim());
console.log('Saved public/vocorx-logo.svg successfully!');
