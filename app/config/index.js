require("dotenv").config();

const port = process.env.PORT || 3000;
const mongoString = process.env.MONGODB_URI;

module.exports = {
	port: port,
	mongoString: mongoString,
};
