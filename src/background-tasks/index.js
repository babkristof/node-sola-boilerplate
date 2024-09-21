const CacheProcessorQueue = require('./queues/cache-processor');
const ImageProcessorQueue = require('./queues/image-processor');
const { startImageProcessor, startCacheProcessor } = require('./workers');

module.exports = {
    ImageProcessor: {
        Queue: ImageProcessorQueue,
        startWorker: startImageProcessor,
    },
    CacheProcessor: {
        Queue: CacheProcessorQueue,
        startWorker: startCacheProcessor,
    },
};
