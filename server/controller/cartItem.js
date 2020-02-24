const Cart = require("../models").Cart;
const Product = require("../models").Product;

exports.getItem = async function(req, res) {
  await Cart.findAll({
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

exports.addItem = async function(req, res) {
  await Cart.findOne({
    where: {
      userId: req.body.userId,
      productId: req.body.product,
      price: req.body.price,
      combo: req.body.combo
    }
  }).then(inCart => {
    if (inCart === null) {
      Cart.create({
        userId: req.body.userId,
        productId: req.body.product,
        price: req.body.price,
        combo: req.body.combo
      })
        .then(cart => {
          res.status(200).send("success");
        })
        .catch(err => {
          res.send(err);
        });
    } else {
      res.send("item exits");
    }
  });
  // await Cart.create({
  //   userId: req.body.userId,
  //   productId: req.body.product,
  //   price: req.body.price
  // })
  //   .then(cart => {
  //     res.status(200).send("success");
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   });
  await Product.findOne({
    where: { id: req.body.product }
  }).then(product => {
    let quant = parseInt(product.quantity);
    quant = quant - 1;
    product.update({ quantity: quant }, { where: { id: req.body.product } });
  });
};
exports.deleteItem = async function(req, res) {
  if (req.body.combo === "false") {
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
  } else {
    await Cart.destroy({
      where: {
        combo: req.body.combo
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
  }
};
