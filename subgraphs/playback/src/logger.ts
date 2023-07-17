import winston from 'winston';

const { combine, errors, json, timestamp } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(errors({ stack: true }), timestamp(), json()),
  defaultMeta: {
    service: 'playback-subgraph',
  },
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
});

export default logger;
