var AuthController = require("../controller/auth");
const express = require("express");
const router = express.Router();

router.post("/", AuthController.signUp);

module.exports = router;
