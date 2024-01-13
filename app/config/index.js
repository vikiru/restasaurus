require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoString = process.env.MONGODB_URI;
const redisString = process.env.REDIS_URl;

module.exports = {
	port: port,
	mongoString: mongoString,
	redisString: redisString,
};
