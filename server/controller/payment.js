const configureStripe = require("stripe");
const stripe = configureStripe("sk_test_I4FMJ5gc2lLZBDMntfFjTxrO00kh2szMLN");
const Payment = require("../models").Payment;

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    Payment.create({
      transId: stripeRes.id,
      transAmount: stripeRes.amount / 100,
      receipt: stripeRes.receipt_url,
      status: stripeRes.status
    })
      .then(cart => {
        res.status(200).send({ success: stripeRes });
      })
      .catch(err => {
        res.send(err);
      });
  }
};

exports.createPayment = async function(req, res) {
  await stripe.charges.create(req.body, postStripeCharge(res));
  //       await Payment.create({
  //     userId: req.body.userId,
  //     productId: req.body.product
  //   })
  //     .then(cart => {
  //       res.status(200).send("success");
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
};
