const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const seqDir = path.join(__dirname, 'public/sequence2');

const optimize = async () => {
    if (!fs.existsSync(seqDir)) return;

    console.log('Optimizing sequence2 (Balanced)...');
    const files = fs.readdirSync(seqDir).filter(f => f.endsWith('.webp'));

    for (const file of files) {
        const inputPath = path.join(seqDir, file);
        const tempPath = path.join(seqDir, `temp_${file}`);

        try {
            await sharp(inputPath)
                .resize({ width: 1920, withoutEnlargement: true }) // Standard HD
                .webp({ quality: 85 }) // High Quality
                .toFile(tempPath);

            fs.unlinkSync(inputPath);
            fs.renameSync(tempPath, inputPath);
            
            process.stdout.write('.');
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log('\nOptimization complete.');
};

optimize();
