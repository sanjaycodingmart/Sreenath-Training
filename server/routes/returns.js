var ReturnsController = require("../controller/returns");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/all", auth, ReturnsController.getAll);
router.post("/accept", auth, ReturnsController.updateOne);
router.post("/decline", auth, ReturnsController.updateDOne);
router.post("/", auth, ReturnsController.addOne);
router.post("/:id", auth, ReturnsController.getOne);

module.exports = router;
