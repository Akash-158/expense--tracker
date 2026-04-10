const Income = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const income = new Income({
      description,
      amount,
      category,
      date,
      userId: req.user.id,
      type: "income"
    });
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: "Income not found" });
    if (income.userId.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });
    
    await income.deleteOne();
    res.json({ message: "Income removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};