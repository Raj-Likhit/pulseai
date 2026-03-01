const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:\\Users\\rajli\\.gemini\\antigravity\\brain\\4de0d200-63fe-4e9f-a12e-da877e14e95e\\pulse_logo_industry_standard_1772338576848.png';
const outputPath = 'c:\\Users\\rajli\\Downloads\\Sur[rise\\public\\pulse_logo.webp';

sharp(inputPath)
    .webp({ quality: 90 })
    .toFile(outputPath)
    .then(() => console.log('Successfully created pulse_logo.webp'))
    .catch(err => console.error('Error creating WebP:', err));
