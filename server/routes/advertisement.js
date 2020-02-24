var AdController = require("../controller/advertisement");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/sale", AdController.addSale);
router.post("/saleget", AdController.getSale);
router.post("/get", AdController.getAd);
router.post("/", AdController.addAll);

module.exports = router;
