const path = require('node:path');

const express = require('express');

const config = require('./config/index');
const { logger } = require('./config/logger');
const mongoDB = require('./data/mongoData');
const middlewares = require('./middlewares/index');
const routes = require('./routes/index');

const app = express();

/* Connect to MongoDB database, log success and error messages (if any) */
const mongoConnection = mongoDB.connect();

/* Setup middlewares */
app.use(middlewares.favicon(path.resolve(__dirname, '../public/favicon.ico')));
app.use(middlewares.helmet());
app.use(middlewares.cors({ methods: ['GET'] }));
app.use(middlewares.limiter);
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded({ extended: true }));
app.use(middlewares.validator);
app.use(middlewares.compression());
app.use(middlewares.morgan);

app.listen(config.port, () =>
  logger.info(
    `restasaurus started on port: http://localhost:${config.port}/api/v1.`
  )
);

app.set('trust proxy', 1);
app.use('/api/v1', routes);

module.exports = {
  app,
  mongoConnection,
};
