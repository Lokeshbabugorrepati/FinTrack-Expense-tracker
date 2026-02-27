import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

// @desc    Get all transactions for the logged-in user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, month, year } = req.query;

    // Build filter
    const filter = { user: req.user._id };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (month && year) {
      // Both month and year provided
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (month && !year) {
      // Only month provided - use current year
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, month - 1, 1);
      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (year && !month) {
      // Only year provided
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .lean();

    console.log(
      `✓ Fetched ${transactions.length} transactions for user ${req.user.email}`
        .cyan,
    );

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this transaction",
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, date, note } = req.body;

    // Validation
    if (!amount || !type || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!["Income", "Expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either Income or Expense",
      });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      amount,
      type,
      category,
      date,
      note,
    });

    console.log(
      `✓ New ${type} transaction created: $${amount} by ${req.user.email}`
        .green,
    );

    res.status(201).json({
      success: true,
      data: transaction,
      message: "Transaction added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res, next) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this transaction",
      });
    }

    // Validate amount if provided
    if (req.body.amount && req.body.amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    // Validate type if provided
    if (req.body.type && !["Income", "Expense"].includes(req.body.type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be either Income or Expense",
      });
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(
      `✓ Transaction updated: ${transaction._id} by ${req.user.email}`.blue,
    );

    res.json({
      success: true,
      data: transaction,
      message: "Transaction updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Make sure user owns transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this transaction",
      });
    }

    await transaction.deleteOne();

    console.log(
      `✓ Transaction deleted: ${transaction._id} by ${req.user.email}`.red,
    );

    res.json({
      success: true,
      data: {},
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics
// @route   GET /api/transactions/analytics
// @access  Private
export const getAnalytics = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { month, year } = req.query;

    // Build base filter
    const baseFilter = { user: userId };

    // Add date filter if month/year provided
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      baseFilter.date = { $gte: startDate, $lte: endDate };
    } else if (month && !year) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, month - 1, 1);
      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);
      baseFilter.date = { $gte: startDate, $lte: endDate };
    } else if (year && !month) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      baseFilter.date = { $gte: startDate, $lte: endDate };
    }

    // Total income and expense
    const summary = await Transaction.aggregate([
      { $match: baseFilter },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach((item) => {
      if (item._id === "Income") {
        totalIncome = item.total;
      } else if (item._id === "Expense") {
        totalExpense = item.total;
      }
    });

    const balance = totalIncome - totalExpense;

    // Category-wise expense breakdown
    const categoryBreakdown = await Transaction.aggregate([
      { $match: { ...baseFilter, type: "Expense" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    // Monthly expense totals (last 12 months or filtered period)
    let monthlyExpenseFilter = { user: userId, type: "Expense" };

    if (baseFilter.date) {
      // If date filter exists, use it
      monthlyExpenseFilter.date = baseFilter.date;
    } else {
      // Default to last 12 months
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      monthlyExpenseFilter.date = { $gte: twelveMonthsAgo };
    }

    const monthlyExpenses = await Transaction.aggregate([
      { $match: monthlyExpenseFilter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Monthly income totals (last 12 months or filtered period)
    let monthlyIncomeFilter = { user: userId, type: "Income" };

    if (baseFilter.date) {
      // If date filter exists, use it
      monthlyIncomeFilter.date = baseFilter.date;
    } else {
      // Default to last 12 months
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      monthlyIncomeFilter.date = { $gte: twelveMonthsAgo };
    }

    const monthlyIncome = await Transaction.aggregate([
      { $match: monthlyIncomeFilter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    console.log(`✓ Analytics fetched for user ${req.user.email}`.cyan);

    res.json({
      success: true,
      data: {
        summary: {
          totalIncome,
          totalExpense,
          balance,
        },
        categoryBreakdown,
        monthlyExpenses,
        monthlyIncome,
      },
    });
  } catch (error) {
    next(error);
  }
};
