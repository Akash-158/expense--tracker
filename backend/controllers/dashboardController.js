const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Monthly overview logic (simplified to all-time for this rebuild without start/end params)
    const recentTransactions = [...expenses, ...incomes]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
      
    // Category distribution for expenses
    const spendByCategoryMap = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    const expenseDistribution = Object.keys(spendByCategoryMap).map(category => ({
      category,
      amount: spendByCategoryMap[category]
    }));

    res.json({
      success: true,
      data: {
        monthlyIncome: totalIncome,
        monthlyExpense: totalExpense,
        savings: totalIncome - totalExpense,
        expenseDistribution,
        recentTransactions
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};