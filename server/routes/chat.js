var ChatController = require("../controller/chat");
const express = require("express");
const router = express.Router();

router.post("/", ChatController.saveAll);
router.get("/", ChatController.getAll);

module.exports = router;
