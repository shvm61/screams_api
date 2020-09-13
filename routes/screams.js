const express = require("express");
const router = express.Router();

const screamsController = require("../controllers/screamsController");

router.get("/", screamsController.getAllScreams);

module.exports = router;
