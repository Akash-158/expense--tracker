const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/", incomeController.addIncome);
router.get("/", incomeController.getIncomes);
router.delete("/:id", incomeController.deleteIncome);

module.exports = router;
