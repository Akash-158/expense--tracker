const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/overview", authMiddleware, dashboardController.getOverview);

module.exports = router;
