const express = require("express");
const router = express.Router();
var MailController = require("../controller/mail");
const auth = require("../middleware/auth");

router.post("/", auth, MailController.sendMail);

module.exports = router;
