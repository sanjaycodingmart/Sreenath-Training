const Cart = require("../models").Cart;
const Product = require("../models").Product;

exports.getItem = async function(req, res) {
  console.log(req.body);
  await Cart.findAll(
    {
      where: {
        userId: req.body.userId
      },
      include: Product
    },
    console.log(req.body.userId)
  )
    .then(products => {
      console.log(products);
      console.log(products[0].Product.dataValues);
      res.send(products);
      res.end();
    })
    .catch(err => {
      res.send(err);
    });
};

exports.addItem = async function(req, res) {
  console.log(req.body);
  await Cart.create({
    userId: req.body.userId,
    productId: req.body.product
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
  await Product.findOne({
    where: { id: req.body.product }
  }).then(product => {
    let quant = parseInt(product.quantity);
    quant = quant - 1;
    product.update({ quantity: quant }, { where: { id: req.body.product } });
  });
};
exports.deleteItem = async function(req, res) {
  console.log(req.body);
  await Cart.destroy({
    where: {
      userId: req.body.userId,
      productId: req.body.product
    }
  })
    .then(cart => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
  await Product.findOne({
    where: { id: req.body.product }
  }).then(product => {
    let quant = parseInt(product.quantity);
    quant = quant + 1;
    product.update({ quantity: quant }, { where: { id: req.body.product } });
  });
};
