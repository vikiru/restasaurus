const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const favicon = require("serve-favicon");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	/* 5 requests every hour */
	windowMs: 60 * 60 * 1000,
	limit: 5,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	handler: function (req, res) {
		return res.status(429).json({
			error: "Please wait, you have exceeded your rate limit of 100 requests per 15 minutes.",
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
