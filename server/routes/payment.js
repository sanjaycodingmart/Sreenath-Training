const configureStripe = require("stripe");
const express = require("express");
const router = express.Router();
const stripe = configureStripe("sk_test_I4FMJ5gc2lLZBDMntfFjTxrO00kh2szMLN");
var PaymentController = require("../controller/payment");
const auth = require("../middleware/auth");

router.post("/", auth, PaymentController.createPayment);
module.exports = router;
