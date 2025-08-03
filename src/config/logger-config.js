const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Custom log format
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} | ${level.toUpperCase()} | ${stack || message}`;
});

// Create logger
const logger = createLogger({
  level: 'info', // default log level
  format: combine(
    errors({ stack: true }), // log full stack trace if error is passed
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new transports.Console(), // print logs to the terminal
    new transports.File({ filename: 'logs/combined.log' }) // Writes logs to the file
  ]
});

module.exports = logger;

/**
 * -------------------- we have 4 transport in winston ----------------------------
 * 1. print log to the terminal
 * 2. writes logs to a file
 * 3. sends logs to a remote HTTP server
 * 4. sends logs to any writable steram
 */
