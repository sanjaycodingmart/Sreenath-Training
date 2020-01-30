var ProductController = require("../controller/product");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", ProductController.getAll);
router.post("/:id", ProductController.getOne);
router.post("/", [auth, admin], ProductController.addOne);

module.exports = router;
