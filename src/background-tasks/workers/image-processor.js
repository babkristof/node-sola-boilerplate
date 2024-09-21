const { compressImage } = require('../../utils/sharp');

module.exports = async (job) => {
    const { file, filename } = job.data;
    await compressImage(file.buffer, filename);
};
