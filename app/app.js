const express = require("express");
const app = express();
const config = require("./config/index");
const mongoDB = require("./data/mongoData");
const middlewares = require("./middlewares/index");

/* Connect to MongoDB database, log success and error messages (if any)*/
mongoDB.connect();

/* Setup middlewares */
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded());
app.use(middlewares.cors());
app.use(middlewares.compression());
app.use(middlewares.morgan("dev"));
app.use(middlewares.helmet());
app.use(middlewares.limiter);

app.listen(config.port, async () =>
	console.log(`restasaurus started on port: http://localhost:${config.port}`),
);
