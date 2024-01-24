import winston from 'winston';
import 'winston-daily-rotate-file';
import morgan from 'morgan';

const { createLogger, format, transports } = winston;

const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} - ${level.toUpperCase()} - ${message}`;
});

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    logFormat
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new transports.Console()
  ]
});

// Morgan stream setup
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Morgan middleware configuration
export const morganMiddleware = morgan(
  (tokens, req, res) => {
    return [
      tokens.date(req, res, 'iso'), // ISO format timestamp
      '-',
      tokens.method(req, res),
      tokens.url(req, res),
      'HTTP/' + tokens['http-version'](req, res),
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res) + 'ms'
    ].join(' ');
  },
  { stream: logger.stream }
);

export default logger;
