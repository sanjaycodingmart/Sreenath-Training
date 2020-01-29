const Notify = require("../models").Notify;
const Product = require("../models").Product;

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
