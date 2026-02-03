const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, 'public/sequence2');
const destDir = path.join(__dirname, 'public/sequence2_final');

// Ensure destination exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const optimize = async () => {
    if (!fs.existsSync(srcDir)) return;

    console.log('Optimizing sequence2 to sequence2_final...');
    // Filter only original frames, ignore temp_
    const files = fs.readdirSync(srcDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));

    for (const file of files) {
        const inputPath = path.join(srcDir, file);
        const outputPath = path.join(destDir, file);

        try {
            await sharp(inputPath)
                .resize({ width: 1920, withoutEnlargement: true }) // Standard HD
                .webp({ quality: 85 }) // High Quality
                .toFile(outputPath);
            
            // process.stdout.write('.');
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log('\nOptimization complete.');
};

optimize();
