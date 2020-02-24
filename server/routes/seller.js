var SellerController = require("../controller/seller");
const express = require("express");
const router = express.Router();

// router.get("/", SellerController.getAll);
router.post("/request/:id", SellerController.getOne);
router.post("/request", SellerController.addRequest);
router.post("/add", SellerController.addOne);
module.exports = router;
