const path = require('node:path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const mongoString = process.env.MONGODB_URI;

if (!mongoString) {
  throw new Error('MONGODB_URI environment variable is not set. Please configure your .env file.');
}

module.exports = {
  env,
  port,
  mongoString,
};
