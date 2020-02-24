const Advertisement = require("../models").advertisement;
const Sale = require("../models").sale;

exports.addAll = async function(req, res) {
  await Advertisement.create({
    brand: req.body.brand,
    DOP: req.body.DOP,
    amount: req.body.amount
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getAd = async function(req, res) {
  Advertisement.findAll({ where: { DOP: req.body.DOP } })
    .then(ad => {
      res.send(ad);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
exports.addSale = async function(req, res) {
  await Sale.create({
    brand: req.body.brand,
    DOS: req.body.DOS,
    offer: req.body.offer
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
};
exports.getSale = async function(req, res) {
  Sale.findAll()
    .then(ad => {
      res.send(ad);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};
