const mongoose = require('mongoose');
const config = require('./src/config/config')
const http = require('http');
const app = require('./src/server');
const logger = require('./src/config/logger');

mongoose
    .connect(config.dbConnection)
    .then(()=> {
        logger.info('connected to mongodb');
    })
    .catch((err) => {
        logger.error(err);
    })


const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, ()=> {
    logger.info('server listening on port' + config.port);
});

const unExpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

const exitHandler = () => {
    if(server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unExpectedErrorHandler);
process.on('SIGTERM', ()=> {
    logger.info('SIGTERM recieved');
    if(server) {
        server.close();
    }
});