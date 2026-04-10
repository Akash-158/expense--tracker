const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const expense = new Expense({
      description,
      amount,
      category,
      date,
      userId: req.user.id,
      type: "expense"
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    if (expense.userId.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });
    
    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};