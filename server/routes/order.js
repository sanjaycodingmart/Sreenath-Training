const express = require("express");
const router = express.Router();
var OrderController = require("../controller/order");
const auth = require("../middleware/auth");

router.post("/updatereview", auth, OrderController.updateReview);
router.post("/updatedate", auth, OrderController.updateDate);
router.post("/update", auth, OrderController.updateTrack);
router.post("/change", auth, OrderController.getAlls);
router.post("/", auth, OrderController.addAll);
router.post("/items/:id", auth, OrderController.getOneUser);
router.post("/items", auth, OrderController.getAll);
router.post("/:id", auth, OrderController.getOne);

module.exports = router;
