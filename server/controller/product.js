const Product = require("../models").Product;
const multer = require("multer");
const express = require("express");
const es = require("elasticsearch");
const app = express();
const redis = require("redis");
const redisClient = redis.createClient(6379);
app.use(express.static("./public"));

redisClient.on("error", err => {
  console.log("Error " + err);
});
var client = new es.Client({
  hosts: ["http://localhost:9200"]
});
client.ping(
  {
    requestTimeout: 3000
  },
  function(error) {
    if (error) {
      console.trace("elasticsearch cluster is down!");
    } else {
      console.log("Elastic search Connected!");
    }
  }
);

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

    res.json(req.files);

    // return res.status(200).send(req.file);
  });
};
exports.getAlls = function(req, res) {
  if (Product) {
    Product.findAll()
      .then(products => res.status(200).send(products))
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    return res.status(404).send("No products in DB");
  }
};
exports.getAll = function(req, res) {
  redisClient.get("123", (err, cache1) => {
    if (cache1 && req.body.offset < JSON.parse(cache1).length) {
      const products = JSON.parse(cache1);
      let offs = products.splice(req.body.offset, 10);
      res.json(offs);
    } else if (Product) {
      Product.findAll({
        offset: req.body.offset,
        limit: 10
      })
        .then(products => {
          res.json(products);
          redisClient.get("123", (err, cache1) => {
            if (cache1) {
              console.log("if");
              let pro = JSON.parse(cache1);
              pro = pro.concat(products);
              redisClient.set("123", JSON.stringify(pro));
            } else {
              console.log("else");
              redisClient.set("123", JSON.stringify(products));
            }
          });
          // res.status(200).send(products);
        })
        .catch(error => {
          res.status(400).send(error);
        });
    } else {
      return res.status(404).send("No products in DB");
    }
  });
};
exports.getAccessory = async function(req, res) {
  if (Product) {
    await Product.findAll({ where: { category: "Accessory" } })
      .then(products => res.status(200).send(products))
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    return res.status(404).send("No products in DB");
  }
};

exports.getOne = async function(req, res) {
  redisClient.get(req.body.Id, (err, cache1) => {
    if (cache1) {
      const products = JSON.parse(cache1);
      res.json(products);
    } else {
      Product.findAll({
        where: {
          id: req.body.Id
        }
      })
        .then(products => {
          res.json(products);
          redisClient.setex(req.body.Id, 3600, JSON.stringify(products));
        })
        .catch(error => {
          res.status(400).send(error);
        });
    }
  });
  if (!product)
    return res.status(404).send("The Product with the given ID was not found.");
};
exports.addOne = async function(req, res) {
  const data = {
    product: req.body.Product,
    price: req.body.Price,
    brand: req.body.Brand,
    memPrice: req.body.memPrice,
    quantity: req.body.Quantity,
    category: req.body.Category,
    furl: req.body.furl,
    url: req.body.url,
    fav: req.body.fav,
    seller: req.body.seller,
    canReturn: req.body.canReturn
  };

  await Product.create({
    product: req.body.Product,
    price: req.body.Price,
    brand: req.body.Brand,
    memPrice: req.body.memPrice,
    quantity: req.body.Quantity,
    category: req.body.Category,
    furl: req.body.furl,
    url: req.body.url,
    fav: req.body.fav,
    seller: req.body.seller,
    canReturn: req.body.canReturn
  })
    .then(product => {
      client.index({
        index: "products",
        body: data
      });
      res.status(201).send(product);
    })
    .catch(error => res.status(400).send(error));
};

exports.getSearch = async function(req, res) {
  client.search(
    {
      index: "products",
      size: req.body.limit,
      q: `product : ${req.body.query}*`
    },
    (err, resp, status) => {
      res.send(resp.hits.hits);
    }
  );
};
exports.deleteOne = async function(req, res) {
  Product.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(cart => {
      client.delete({
        index: "products",
        id: req.body.id
      });

      res.status(200).send("success");
    })
    .catch(err => {
      res.send(err);
    });
};
exports.updateOne = async function(req, res) {
  const data = {
    product: req.body.Product,
    price: req.body.Price,
    brand: req.body.Brand,
    memPrice: req.body.memPrice,
    quantity: req.body.Quantity,
    category: req.body.Category,
    furl: req.body.furl,
    url: req.body.url,
    fav: req.body.fav,
    seller: req.body.seller,
    canReturn: req.body.canReturn
  };
  Product.update(
    {
      product: req.body.Product,
      price: req.body.Price,
      brand: req.body.Brand,
      memPrice: req.body.memPrice,
      quantity: req.body.Quantity,
      category: req.body.Category,
      furl: req.body.furl,
      url: req.body.url,
      fav: req.body.fav,
      seller: req.body.seller,
      canReturn: req.body.canReturn
    },
    { where: { id: req.body.id } }
  ).then(result => {
    client.update({
      index: "products",
      id: req.body.id,
      body: data
    });
    res.send(200);
  });
};
