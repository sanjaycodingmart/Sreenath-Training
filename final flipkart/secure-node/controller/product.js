const Product = require("../models").Product;
const multer = require("multer");
const express = require("express");
const app = express();
app.use(express.static("./public"));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: storage }).array("file");
exports.upload = async function(req, res) {
  await upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req);
    res.json(req.files);

    // return res.status(200).send(req.file);
  });
};
exports.getAll = async function(req, res) {
  if (Product) {
    await Product.findAll()
      .then(products => res.status(200).send(products))
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    return res.status(404).send("No products in DB");
  }
};

exports.getOne = async function(req, res) {
  console.log(req.body.Id);
  await Product.findAll({
    where: {
      id: req.body.Id
    }
  })
    .then(products => res.status(200).send(products))
    .catch(error => {
      res.status(400).send(error);
    });

  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");
};
exports.addOne = async function(req, res) {
  console.log(req.body.url);
  await Product.create({
    product: req.body.Product,
    price: req.body.Price,
    quantity: req.body.Quantity,
    category: req.body.Category,
    furl: req.body.furl,
    url: req.body.url,
    fav: req.body.fav
  })
    .then(product => res.status(201).send(product))
    .catch(error => res.status(400).send(error));
};
