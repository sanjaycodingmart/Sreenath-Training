const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
var ProductController = require("../controller/product");
router.post("/", auth, ProductController.upload);

module.exports = router;
