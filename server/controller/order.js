const Order = require("../models").Order;
const Product = require("../models").Product;
const Notify = require("../models").Notify;
const Payment = require("../models").Payment;

exports.addAll = async function(req, res) {
  await Order.create({
    userId: req.body.userId,
    productId: req.body.product,
    rating: false,
    transId: req.body.transId,
    tracking: req.body.tracking,
    estDD: req.body.estDD
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
  await Notify.create({
    userId: req.body.userId,
    productId: req.body.product
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
};

exports.getOne = async function(req, res) {
  await Order.findAll({
    where: {
      id: req.body.Id
    },
    include: Product
  })
    .then(products => {
      res.status(200).send(products);
      Notify.destroy({
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
exports.getOneUser = async function(req, res) {
  await Order.findAll({
    where: {
      id: req.body.Id
    },
    include: Product
  })
    .then(products => {
      res.status(200).send(products);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

exports.getAll = async function(req, res) {
  await Order.findAll({
    where: {
      userId: req.body.userId
    },
    include: [Payment, Product]
  })
    .then(products => {
      res.send(products);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getAlls = async function(req, res) {
  await Order.findAll({
    offset: 0,
    limit: req.body.offsets,
    order: [[req.body.orderBy, req.body.orderDirection]],
    include: [Payment, Product]
  })
    .then(products => {
      res.send(products);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.updateTrack = async function(req, res) {
  await Order.update(
    { tracking: req.body.tracking },
    { where: { id: req.body.Ids } }
  )
    .then(request => {
      res.status(200).send(request);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
exports.updateDate = async function(req, res) {
  await Order.update({ estDD: req.body.estDD }, { where: { id: req.body.Ids } })
    .then(request => {
      res.status(200).send(request);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
exports.updateReview = async function(req, res) {
  await Order.update(
    { rating: req.body.productRating },
    { where: { id: req.body.Oids } }
  )
    .then(request => {
      res.status(200).send(request);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
