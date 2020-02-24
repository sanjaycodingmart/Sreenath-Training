const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
var NotifyController = require("../controller/notifyItem");

router.get("/", auth, NotifyController.getNotify);
router.get("/support", auth, NotifyController.getSupportNotify);
router.get("/request", auth, NotifyController.getRequestNotify);
router.get("/return", auth, NotifyController.getReturnNotify);

module.exports = router;
