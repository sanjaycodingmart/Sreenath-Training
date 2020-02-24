const RequestNotify = require("../models").RequestNotify;
const Seller = require("../models").Seller;
const User = require("../models").User;

exports.addRequest = async function(req, res) {
  await RequestNotify.create({
    companyName: req.body.companyName,
    sellerName: req.body.sellerName,
    address: req.body.companyAddress,
    email: req.body.email,
    contact: req.body.contact
  })
    .then(product => res.status(201).send(product))
    .catch(error => res.status(400).send(error));
};

exports.getOne = async function(req, res) {
  await RequestNotify.findAll({
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
exports.addOne = async function(req, res) {
  await Seller.create({
    companyName: req.body.companyName,
    sellerName: req.body.sellerName,
    address: req.body.companyAddress,
    email: req.body.email,
    contact: req.body.contact
  })
    .then(product => {
      User.create({
        email: req.body.email,
        password: "123456",
        isAdmin: false,
        isSellerAdmin: false,
        isSellerCompany: true,
        cart: 0,
        favs: 0
      })
        .then(user => {
          res.status(201).send(user);
          RequestNotify.destroy({
            where: {
              companyName: req.body.companyName
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
          console.log(error);
          res.status(400).send(error);
        });
    })
    .catch(error => res.status(400).send(error));
};
