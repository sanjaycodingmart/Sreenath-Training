const Returns = require("../models").Return;
const ReturnNotify = require("../models").ReturnNotify;
const Product = require("../models").Product;

exports.addOne = async function(req, res) {
  await Returns.create({
    userId: req.body.userId,
    productId: req.body.productId,
    transId: req.body.transId,
    seller: req.body.seller,
    reason: req.body.reason,
    status: req.body.status
  })
    .then(product => {
      ReturnNotify.create({
        userId: req.body.userId,
        productId: req.body.productId,
        transId: req.body.transId,
        seller: req.body.seller,
        reason: req.body.reason,
        status: req.body.status
      })
        .then(product => res.status(201).send(product))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};
exports.getOne = async function(req, res) {
  await Returns.findAll({
    where: {
      id: req.body.Id
    }
  })
    .then(request => {
      res.status(200).send(request);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
exports.updateOne = async function(req, res) {
  await Returns.update({ status: "Accepted" }, { where: { id: req.body.Id } })
    .then(request => {
      ReturnNotify.destroy({
        where: {
          id: req.body.Id
        }
      })
        .then(cart => {
          res.status(200).send("success");
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
exports.updateDOne = async function(req, res) {
  await Returns.update({ status: "Declined" }, { where: { id: req.body.Id } })
    .then(request => {
      ReturnNotify.destroy({
        where: {
          id: req.body.Id
        }
      })
        .then(cart => {
          res.status(200).send("success");
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getAll = async function(req, res) {
  await Returns.findAll({
    where: {
      userId: req.body.userId
    },
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
