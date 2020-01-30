const express = require("express");
const signup = require("../routes/signup");
const signin = require("../routes/signin");
const product = require("../routes/product");
const order = require("../routes/order");
const mail = require("../routes/mail");
const notifyItem = require("../routes/notifyItem");
const cartItem = require("../routes/cartItem");
const favItem = require("../routes/favItem");
const upload = require("../routes/upload");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/signup", signup);
  app.use("/api/signin", signin);
  app.use("/api/product", product);
  app.use("/api/order", order);
  app.use("/api/mail", mail);
  app.use("/api/notifyItem", notifyItem);
  app.use("/api/cartItem", cartItem);
  app.use("/api/favItem", favItem);
  app.use("/api/upload", upload);
};
