const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
var NotifyController = require("../controller/notifyItem");

router.get("/", [auth, admin], NotifyController.getNotify);

module.exports = router;
