const fs = require('node:fs');
const path = require('node:path');

const winston = require('winston');

const { env } = require('./index');

const logDir = path.join(__dirname, '../logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const errorStream = fs.createWriteStream(path.join(logDir, 'errors.log'), {
  flags: 'w',
});

const requestStream = fs.createWriteStream(path.join(logDir, 'requests.log'), {
  flags: 'w',
});

const infoStream = fs.createWriteStream(path.join(logDir, 'all.log'), {
  flags: 'w',
});
const loggingLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const loggingColours = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'white',
};

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.uncolorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    info => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const loggingTransports = {
  info: new winston.transports.Stream({
    stream: infoStream,
    format: fileFormat,
  }),
  error: new winston.transports.Stream({
    stream: errorStream,
    level: 'error',
    format: fileFormat,
  }),
  request: new winston.transports.Stream({
    stream: requestStream,
    level: 'http',
    format: fileFormat,
  }),
};

const infoLogger = winston.createLogger({
  level: 'info',
  levels: loggingLevels,
  transports: loggingTransports.info,
});

const errorLogger = winston.createLogger({
  level: 'error',
  transports: loggingTransports.error,
});

const requestLogger = winston.createLogger({
  level: 'http',
  transports: loggingTransports.request,
});

const logger = {
  info: parameters => {
    return infoLogger.info(parameters);
  },
  error: parameters => {
    return errorLogger.error(parameters);
  },
  http: parameters => {
    return requestLogger.http(parameters);
  },
};

if (env === 'development') {
  infoLogger.add(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'info',
    })
  );
  errorLogger.add(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'error',
    })
  );
  requestLogger.add(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'http',
    })
  );
  winston.addColors(loggingColours);
}

module.exports = {
  logger,
  infoLogger,
  errorLogger,
  requestLogger,
};
