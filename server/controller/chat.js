const Chat = require("../models").chat;
const Notify = require("../models").supportnotify;

exports.saveAll = async function(req, res) {
  await Chat.create({
    message: req.body.message,
    user: req.body.user,
    admin: req.body.admin
  }).then(chat => {
    if (!req.body.admin) {
      Notify.findOne({ where: { user: req.body.user } })
        .then(user => {
          if (user === null) {
            Notify.create({
              user: req.body.user,
              message: req.body.message,
              seen: false
            })
              .then(cart => {
                res.status(200).send("success");
              })
              .catch(err => {
                res.send(err);
              });
          }
        })
        .catch(error => res.status(400).send(error));
    }
    res.status(201).send(chat);
  });
};
exports.getAll = async function(req, res) {
  await Chat.findAll({
    order: [["id", "asc"]]
  })
    .then(chat => {
      res.status(201).send(chat);
    })
    .catch(error => res.status(400).send(error));
};
