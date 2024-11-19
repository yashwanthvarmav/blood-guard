const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Define your custom format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create a logger
const logger = createLogger({
  format: combine(
    label({ label: 'BloodGuard' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;