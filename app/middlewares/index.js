const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const rateLimit = require("express-rate-limit");

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

module.exports = {
	bodyParser: bodyParser,
	cors: cors,
	compression: compression,
	helmet: helmet,
	morgan: morgan,
	mongoose: mongoose,
	favicon: favicon,
	limiter: limiter,
};
