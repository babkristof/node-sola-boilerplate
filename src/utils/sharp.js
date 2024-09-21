const sharp = require('sharp');

const compressImage = async (input, filename) => {
    const outputPath = `${__dirname}/../../uploads/${filename}`;
    sharp(Buffer.from(input))
        .resize(600)
        .webp({ quality: 80 })
        .toFile(outputPath);
};

module.exports = { compressImage };
