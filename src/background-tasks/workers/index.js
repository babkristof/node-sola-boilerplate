const { Worker } = require('bullmq');
const path = require('path');
const config = require('../../config/config');
const logger = require('../../config/logger');

const createWorker = async (name, filename) => {
    const processorPath = path.join(__dirname, filename);
    const worker = new Worker(name, processorPath, {
        connection: {
            host: config.redis.host,
            port: config.redis.port,
        },
        concurrency: 3,
    });
    worker.on('completed', (job) =>
        logger.info(`${job.name} with id ${job.id} is completed`),
    );
};

module.exports = { createWorker };
