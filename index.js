const http = require('http');
const express = require('express');
const config = require('./src/config/config');
const loader = require('./src/loaders');
const logger = require('./src/config/logger');

const unExpectedErrorHandler = (server) => {
    return function (error) {
        logger.error(error);
        exitHandler(server);
    };
};

const exitHandler = (server) => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const startServer = async () => {
    const app = express();
    await loader(app);

    const httpServer = http.createServer(app);
    const server = httpServer.listen(config.port, () => {
        logger.info('server listening on port' + config.port);
    });

    process.on('uncaughtException', unExpectedErrorHandler(server));
    process.on('unhandledRejection', unExpectedErrorHandler(server));
    process.on('SIGTERM', () => {
        logger.info('SIGTERM recieved');
        if (server) {
            server.close();
        }
    });
};
startServer();
