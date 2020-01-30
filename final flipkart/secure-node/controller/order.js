const Order = require("../models").Order;
const Product = require("../models").Product;
const Notify = require("../models").Notify;

exports.getAll = async function(req, res) {
  console.log(req.body);
  await Order.create({
    userId: req.body.userId,
    productId: req.body.product
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
  console.log(req.body.Id);
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
