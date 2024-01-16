const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env'),
});

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const mongoString = process.env.MONGODB_URI;
const redisString = process.env.REDIS_URl;

module.exports = {
    env,
    port,
    mongoString,
    redisString,
};
