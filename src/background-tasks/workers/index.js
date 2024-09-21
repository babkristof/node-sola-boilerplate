const { Worker } = require('bullmq');
const path = require('path');
const config = require('../../config/config');
const logger = require('../../config/logger');

const startImageProcessor = async () => {
    const processorPath = path.join(__dirname, 'image-processor.js');
    const ImageProcessorWorker = new Worker('ImageProcessor', processorPath, {
        connection: {
            host: config.redis.host,
            port: config.redis.port,
        },
        concurrency: 3,
    });
    ImageProcessorWorker.on('completed', (job) =>
        logger.info(`image processor job ${job.id} completed`),
    );
};

const startCacheProcessor = async () => {
    const processorPath = path.join(__dirname, 'cache-processor.js');
    const CacheProcessorWorker = new Worker('Cache', processorPath, {
        connection: {
            host: config.redis.host,
            port: config.redis.port,
        },
    });
    CacheProcessorWorker.on('completed', (job) =>
        logger.info(`caching job ${job.id} completed`),
    );
};

module.exports = { startImageProcessor, startCacheProcessor };
