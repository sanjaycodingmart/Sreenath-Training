const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
var CartController = require("../controller/cartItem");

router.post("/", auth, CartController.getItem);
router.post("/add", auth, CartController.addItem);
router.post("/delete", CartController.deleteItem);

module.exports = router;
