const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { ImageProcessor } = require('../background-tasks');

const createBlog = catchAsync(async (req, res) => {
    await blogService.createBlog(req.body, await req.user);
    res.status(httpStatus.CREATED).send({
        success: true,
        message: 'Blog created successfully',
    });
});

const getBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getBlogs(req.body.userId);
    res.status(httpStatus.OK).json(blogs);
});

const getRecentBlogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getRecentBlogs();
    res.status(httpStatus.OK).json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
    if (!req.file) {
        throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
    }
    const filename = `image-${Date.now()}.webp`;
    await ImageProcessor.Queue.add('ImageProcessorJob', {
        filename,
        file: req.file,
    });
    await ImageProcessor.startWorker();
    res.status(httpStatus.OK).json({ filename });
});

const getFile = catchAsync(async (req, res) => {
    const { filename } = req.params;
    const stream = await blogService.getReadableFileStream(filename);
    const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
    res.setHeader('Content-Type', contentType);
    stream.pipe(res);
});
module.exports = {
    createBlog,
    getBlogs,
    getRecentBlogs,
    uploadFile,
    getFile,
};
