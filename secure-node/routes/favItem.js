const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
var FavController = require("../controller/favItem");

router.post("/", FavController.getFav);
router.post("/add", auth, FavController.addFav);
router.post("/delete", auth, FavController.deleteFav);

module.exports = router;
