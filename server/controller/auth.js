const User = require("../models").User;
const jwt = require("jsonwebtoken");
const redis = require("redis");
const client = redis.createClient(6379);
var bcrypt = require("bcrypt-nodejs");

client.on("error", err => {
  console.log("Error " + err);
});
exports.signIn = async function(req, res) {
  // const Users = req.body.email;
  // const pass = req.body.password;
  // client.get(Users, (err, cache1) => {
  //   if (cache1) {
  //     const data = JSON.parse(cache1);
  //     console.log(data.password);
  //     bcrypt.compare(pass, data.password, function(err, isMatch) {
  //       if (err) {
  //         res.status(401).send({
  //           success: false,
  //           msg: "Authentication failed. Wrong password."
  //         });
  //       } else {
  //         const payload = {
  //           id: data.id,
  //           email: data.email,
  //           isAdmin: data.isAdmin,
  //           isSellerCompany: data.isSellerCompany,
  //           isSellerAdmin: data.isSellerAdmin
  //         };
  //         var token = jwt.sign(payload, "nodeauthsecret");
  //         jwt.verify(token, "nodeauthsecret", function(err, data) {
  //           console.log(err, data);
  //         });
  //         res.json({ success: true, source: "cache", token: token });
  //       }
  //     });
  //     // res.json({ source: "cache", token: JSON.parse(token) });
  //   } else {
  await User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: "Authentication failed. User not found."
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            isSellerCompany: user.isSellerCompany,
            isSellerAdmin: user.isSellerAdmin,
            plusMember: user.plusMember,
            plusPeriod: user.plusPeriod
          };
          var token = jwt.sign(payload, "nodeauthsecret");
          jwt.verify(token, "nodeauthsecret", function(err, data) {});
          User.update(
            { sessionToken: token },
            { where: { email: req.body.email } }
          )
            .then(request => {
              // res.json({ success: true, token: token });
            })
            .catch(error => {
              res.status(400).send(error);
            });
          const cache1 = {
            id: user.id,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            isSellerCompany: user.isSellerCompany,
            isSellerAdmin: user.isSellerAdmin,
            plusMember: user.plusMember
          };
          // client.setex(Users, 3600, JSON.stringify(token));
          // client.setex(Users, 3600, JSON.stringify(cache1));
          res.json({ success: true, token: token });
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password."
          });
        }
      });
    })
    .catch(error => res.status(400).send(error));
};
// });
// };
exports.signUp = async function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ msg: "Please pass username and password." });
  } else {
    User.create({
      email: req.body.email,
      password: req.body.password,
      plusMember: false,
      plusPeriod: null,
      isAdmin: false,
      isSellerAdmin: false,
      isSellerCompany: false,
      cart: 0,
      favs: 0
    })
      .then(user => res.status(201).send(user))
      .catch(error => {
        res.status(400).send(error);
      });
  }
};

exports.plusUpdate = async function(req, res) {
  await User.update(
    { plusMember: req.body.plusMember, plusPeriod: req.body.plusPeriod },
    { where: { email: req.body.email } }
  )
    .then(request => {
      res.status(200).send(request);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};
