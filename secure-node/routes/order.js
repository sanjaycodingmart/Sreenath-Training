const express = require("express");
const router = express.Router();
var OrderController = require("../controller/order");
const auth = require("../middleware/auth");

router.post("/", auth, OrderController.getAll);
router.post("/:id", auth, OrderController.getOne);

module.exports = router;
