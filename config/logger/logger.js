const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new DailyRotateFile({
      filename: 'logs/agami-intalk-%DATE%.log', 
      datePattern: 'YYYY-MM-DD-HH', 
      zippedArchive: false, 
      maxSize: '20m',
      maxFiles: '24h',
    })
  ],
});

module.exports = logger;
