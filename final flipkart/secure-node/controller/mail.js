const Cart = require("../models").Cart;
const nodemailer = require("nodemailer");
const Product = require("../models").Product;
const PDFDocument = require("pdfkit");
var fs = require("fs");
var pdf = require("html-pdf");
var options = { format: "Letter" };

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "writetosreesh@gmail.com",
    pass: "Stackdev"
  }
});

exports.sendMail = async function(req, res) {
  console.log(req.body);
  await Cart.findAll(
    {
      where: {
        userId: req.body.Ids
      },
      include: Product
    },
    console.log(req.body.userId)
  )
    .then(products => {
      console.log(products);
      console.log(products[0].Product.dataValues);
      let product = products;

      var content = product.reduce(function(a, b) {
        return (
          a +
          "<tr><td>" +
          b.Product.dataValues.product +
          "</a></td><td>" +
          b.Product.dataValues.price +
          "</td><td><img width=60px height=100px src=" +
          b.Product.dataValues.furl +
          "></img></td></tr>"
        );
      }, "");
      let total = 0;
      for (let i = 0; i < product.length; i++) {
        total = total + product[i].Product.dataValues.price;
      }
      var html =
        "<div><h1>Thanks for purchasing " +
        req.body.userId +
        "</h1><br><h3>Below are the informations of your order</h3><br><table><thead><tr><th>Product</th><th>Price</th><th>Product-Image</th></tr></thead><tbody>" +
        content +
        "</tbody></table><h5>Total " +
        total +
        "</h5></div>";
      pdf
        .create(html, options)
        .toFile("./invoice/invoice.pdf", function(err, res) {
          if (err) return console.log(err);
          console.log(res);
        });

      res.send(products[0].Product.dataValues);
      const mailOptions = {
        from: "writetosreesh@gmail.com",
        to: "sreenaathv8@gmail.com",
        subject: "Order confirmation Mail",
        html:
          "<div><h6>Below are the informations of your order</h6><br><table><thead><tr><th>Product</th><th>Price</th><th>Product-Image</th></tr></thead><tbody>" +
          content +
          "</tbody></table></div>",
        attachments: [
          { filename: "invoice.pdf", path: "./invoice/invoice.pdf" }
        ]
      };
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
      Cart.destroy({
        where: {
          userId: req.body.Ids
        }
      })
        .then(cart => {
          res.status(200).send("success");
        })
        .catch(err => {
          res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });
};
