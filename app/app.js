const express = require("express");
const app = express();
const config = require("./config/index");
const mongoDB = require("./data/mongoData");
const middlewares = require("./middlewares/index");
const routes = require("./routes/index.js");

/* Connect to MongoDB database, log success and error messages (if any)*/
mongoDB.connect();

/* Setup middlewares */
app.use(middlewares.bodyParser.json());
app.use(middlewares.bodyParser.urlencoded({ extended: true }));
app.use(middlewares.cors());
app.use(middlewares.compression());
app.use(middlewares.morgan("dev"));
app.use(middlewares.helmet());

app.listen(config.port, async () =>
	console.log(
		`restasaurus started on port: http://localhost:${config.port}/api/v1`,
	),
);

app.use("/api/v1", routes);
