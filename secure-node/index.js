const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();
var db = require("./models");

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.PORT || config.get("port");
app.use(express.static("public"));

const server = app.listen(port, () => {
  db.sequelize.sync();
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
