const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const { env } = require('../config/index');
const { logger } = require('../config/logger');

const limiter = rateLimit({
  /* 20 requests every hour */
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler(req, res) {
    const resetTime = new Date(req.rateLimit.resetTime);
    const currentTime = new Date();
    const timeLeft = Math.ceil((resetTime - currentTime) / 1000 / 60);

    res.setHeader('RateLimit-Reset', timeLeft);

    return res.status(429).json({
      error: `Please wait, you have exceeded your rate limit of 20 requests per hour. You can make another request in ${timeLeft} minutes.`,
    });
  },
});

const morganStream = {
  write: message => logger.http(message),
};

const skip = () => {
  return env !== 'development';
};

const morganMiddleware = morgan('dev', {
  stream: morganStream,
  skip,
});

const validationMiddleware = [
  body('*').trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  bodyParser,
  cors,
  compression,
  helmet,
  morgan: morganMiddleware,
  mongoose,
  favicon,
  limiter,
  validator: validationMiddleware,
};
