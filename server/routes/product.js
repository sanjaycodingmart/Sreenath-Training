var ProductController = require("../controller/product");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", ProductController.getAlls);
router.post("/gets", ProductController.getAll);
router.post("/update", ProductController.updateOne);
router.post("/delete", ProductController.deleteOne);
router.post("/search", ProductController.getSearch);
router.get("/accessory", ProductController.getAccessory);
router.post("/:id", ProductController.getOne);
router.post("/", auth, ProductController.addOne);

module.exports = router;
