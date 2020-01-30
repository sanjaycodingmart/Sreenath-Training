const User = require("../models").User;

exports.signIn = async function(req, res) {
  User.findOne({
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
            isAdmin: user.isAdmin
          };
          var token = jwt.sign(payload, "nodeauthsecret");
          jwt.verify(token, "nodeauthsecret", function(err, data) {
            console.log(err, data);
          });
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

exports.signUp = async function(req, res) {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ msg: "Please pass username and password." });
  } else {
    User.create({
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
      cart: 0,
      favs: 0
    })
      .then(user => res.status(201).send(user))
      .catch(error => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
