const multer = require('multer');
const httpStatus = require('http-status');
const ApiError = require('./ApiError');

module.exports = multer({
    fileFilter(req, file, cb) {
        const maxFileSize = 3 * 1024 * 1024;
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new ApiError(httpStatus.BAD_REQUEST, 'Only images are allowed'));
        } else if (file.size > maxFileSize) {
            cb(
                new ApiError(
                    httpStatus.BAD_REQUEST,
                    'File size should not exceed 3mb',
                ),
            );
        } else {
            cb(null, true);
        }
    },
});
