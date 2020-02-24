var AuthController = require("../controller/auth");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", AuthController.plusUpdate);

module.exports = router;
