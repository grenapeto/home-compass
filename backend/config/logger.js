import winston from 'winston';
import 'winston-daily-rotate-file';

const { createLogger, format, transports } = winston;
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} - ${level.toUpperCase()} - ${message}`;
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'DD/MM/YYYY' }),
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

export default logger;
