const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const { logger } = require("../config/logger");
const { env } = require("../config/index");
const compression = require("compression");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const limiter = rateLimit({
	/* 20 requests every hour */
	windowMs: 60 * 60 * 1000,
	limit: 20,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	handler: function (req, res) {
		return res.status(429).json({
			error: "Please wait, you have exceeded your rate limit of 20 requests per hour.",
		});
	},
});

const morganStream = {
	write: message => logger.http(message),
};

const skip = () => {
	return env !== "development";
};

const morganMiddleware = morgan("dev", {
	stream: morganStream,
	skip: skip,
});

const validationMiddleware = [
	body("*").trim().escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = {
	bodyParser: bodyParser,
	cors: cors,
	compression: compression,
	helmet: helmet,
	morgan: morganMiddleware,
	mongoose: mongoose,
	favicon: favicon,
	limiter: limiter,
	validator: validationMiddleware,
};
