const Notify = require("../models").Notify;
const Product = require("../models").Product;
const RequestNotify = require("../models").RequestNotify;
const ReturnNotify = require("../models").ReturnNotify;
const supportnotify = require("../models").supportnotify;
const Returns = require("../models").Return;

exports.getNotify = async function(req, res) {
  Notify.findAll({
    include: Product
  })
    .then(products => {
      res.send(products);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getRequestNotify = async function(req, res) {
  RequestNotify.findAll()
    .then(request => {
      res.send(request);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getReturnNotify = async function(req, res) {
  ReturnNotify.findAll()
    .then(request => {
      if (request.length > 0) {
        for (let i = 0; i < request.length; i++) {
          if (new Date() - request[i].createdAt > 2000000) {
            ReturnNotify.destroy({
              where: {
                id: request[i].id
              }
            })
              .then(cart => {
                Returns.update(
                  { status: "Timeout" },
                  { where: { id: request[i].id } }
                ).then(request => {
                  res.status(200).send("Mail sent and Deleted");
                });
              })
              .catch(err => {
                res.send(err);
              });
          }
        }
      }
      res.send(request);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getSupportNotify = async function(req, res) {
  supportnotify
    .findAll()
    .then(request => {
      res.send(request);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
