const User = require("../models").User;
const Product = require("../models").Product;

exports.getFav = async function(req, res) {
  await User.findOne({
    where: {
      id: req.body.userId
    }
  }).then(user => {
    let existing = [];
    existing = JSON.parse(user.favs);

    if (existing == null) existing = [];

    Product.findAll({
      where: [{ id: existing }]
    })
      .then(products => {
        res.send(products);
      })
      .catch(err => res.send(err));
  });
};

exports.addFav = async function(req, res) {
  await User.findOne({
    where: {
      id: req.body.userId
    }
  }).then(user => {
    let existing = [];
    existing = JSON.parse(user.favs);

    if (existing == 0) existing = [];
    existing.push(req.body.favorite);
    var item = JSON.stringify(existing);

    user
      .update({ favs: item }, { where: [{ id: req.body.user }] })
      .then(res.send("Item Added"))
      .catch(err => {
        if (err.name == "SequelizeUniqueConstraintError")
          res.send("Already in Items");
        else res.send(err.name);
      });
  });
  await Product.findOne({
    where: { id: req.body.favorite }
  }).then(product => {
    product.update({ fav: true }, { where: { id: req.body.favorite } });
  });
};
exports.deleteFav = async function(req, res) {
  User.findOne({
    where: {
      id: req.body.userId
    }
  }).then(user => {
    let existing = [];
    existing = JSON.parse(user.favs);

    if (existing == 0) existing = [];
    let pro = req.body.favorite;
    for (var i = 0; i < existing.length; i++) {
      if (existing[i] === pro) {
        existing.splice(i, 1);
      }
    }
    var item = JSON.stringify(existing);

    user
      .update({ favs: item }, { where: [{ id: req.body.user }] })
      .then(res.send("Item Deleted"))
      .catch(err => {
        if (err.name == "SequelizeUniqueConstraintError")
          res.send("Already in Items");
        else res.send(err.name);
      });
  });
  Product.findOne({
    where: { id: req.body.favorite }
  }).then(product => {
    product.update({ fav: false }, { where: { id: req.body.favorite } });
  });
};
