const config = require("config");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
var http = require("http");
var express = require("express"),
  app = (module.exports.app = express());

var server = http.createServer(app);
var io = require("socket.io").listen(server);
server.listen(8000, () => {
  console.log(`Listening on port 8000...`);
});
var db = require("./models");
app.use(cors());
var sockets = {};
require("./startup/routes")(app);
require("./startup/config")();

io.origins("*:*");

var news = io.of("/news").on("connection", function(socket) {
  console.log("client connected");

  socket.on("news", message => {
    console.log(message);
    news.emit("news", message);
  });
});

// const port = process.env.PORT || config.get("port");
app.use(express.static("public"));

module.exports = server;
