import winston from 'winston';

const { colorize, combine, errors, printf, timestamp } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(
    colorize({ level: true }),
    errors({ stack: true }),
    timestamp(),
    printf(
      (info) =>
        `[${info.timestamp}] ${info.level} (${info.service}): ${info.message}`
    )
  ),
  defaultMeta: {
    service: 'spotify-subgraph',
  },
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
});

export default logger;
