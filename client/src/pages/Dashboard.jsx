import { useState, useEffect } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";
import { transactionAPI } from "../utils/api";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import TransactionModal from "../components/TransactionModal";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import TransactionFilters from "../components/TransactionFilters";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    month: "",
    year: "",
  });
  const [analyticsFilters, setAnalyticsFilters] = useState({
    month: "",
    year: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  useEffect(() => {
    fetchAnalytics();
  }, [analyticsFilters]);

  const fetchTransactions = async () => {
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.category) params.category = filters.category;
      if (filters.month) params.month = filters.month;
      if (filters.year) params.year = filters.year;

      const { data } = await transactionAPI.getAll(params);
      setTransactions(data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch transactions",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const params = {};
      if (analyticsFilters.month) params.month = analyticsFilters.month;
      if (analyticsFilters.year) params.year = analyticsFilters.year;

      const { data } = await transactionAPI.getAnalytics(params);
      setAnalytics(data.data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  };

  const handleAddTransaction = async (formData) => {
    setSubmitting(true);
    try {
      if (editingTransaction) {
        await transactionAPI.update(editingTransaction._id, formData);
        toast.success("Transaction updated successfully");
      } else {
        await transactionAPI.create(formData);
        toast.success("Transaction added successfully");
      }
      setModalOpen(false);
      setEditingTransaction(null);
      setShowAllTransactions(false); // Reset to show recent 10
      fetchTransactions();
      fetchAnalytics();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await transactionAPI.delete(id);
        toast.success("Transaction deleted successfully");
        setShowAllTransactions(false); // Reset to show recent 10
        fetchTransactions();
        fetchAnalytics();
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete transaction",
        );
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setShowAllTransactions(false); // Reset to show only 10 when filters change
    if (key === "reset") {
      setFilters({
        type: "",
        category: "",
        month: "",
        year: "",
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setModalOpen(true);
  };

  if (loading && !analytics) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loading message="Loading dashboard..." />
      </div>
    );
  }

  const { summary } = analytics || {
    summary: { totalIncome: 0, totalExpense: 0, balance: 0 },
  };
  const isOverBudget = summary.totalExpense > summary.totalIncome;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              Track your income and expenses with powerful analytics
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="btn-primary flex items-center space-x-2 shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/60 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Budget Warning */}
        {isOverBudget && summary.totalExpense > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-300 dark:border-red-700 rounded-xl p-4 sm:p-5 mb-6 flex items-start space-x-3 shadow-lg animate-pulse">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-red-800 dark:text-red-200">
                ⚠️ Budget Alert
              </h3>
              <p className="text-sm sm:text-base text-red-700 dark:text-red-300 mt-1">
                Your expenses exceed your income. Consider reviewing your
                spending habits.
              </p>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SummaryCard
            title="Total Income"
            amount={summary.totalIncome}
            icon={TrendingUp}
            gradient="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600"
            textColor="text-white"
          />
          <SummaryCard
            title="Total Expense"
            amount={summary.totalExpense}
            icon={TrendingDown}
            gradient="bg-gradient-to-br from-red-500 via-rose-500 to-pink-600"
            textColor="text-white"
          />
          <SummaryCard
            title="Balance"
            amount={summary.balance}
            icon={Wallet}
            gradient={
              summary.balance >= 0
                ? "bg-gradient-to-br from-primary-500 via-blue-600 to-purple-600"
                : "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600"
            }
            textColor="text-white"
          />
        </div>

        {/* Analytics Filters */}
        <div className="card mb-6 bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-primary-900/10 border-2 border-primary-200 dark:border-primary-700">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-2 rounded-lg mr-3">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              📊 Analytics Filters
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="label text-xs">Month</label>
              <select
                value={analyticsFilters.month}
                onChange={(e) =>
                  setAnalyticsFilters((prev) => ({
                    ...prev,
                    month: e.target.value,
                  }))
                }
                className="input-field text-sm"
              >
                <option value="">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div>
              <label className="label text-xs">Year</label>
              <select
                value={analyticsFilters.year}
                onChange={(e) =>
                  setAnalyticsFilters((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
                className="input-field text-sm"
              >
                <option value="">All Years</option>
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex items-end">
              {(analyticsFilters.month || analyticsFilters.year) && (
                <button
                  onClick={() => setAnalyticsFilters({ month: "", year: "" })}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <CategoryPieChart data={analytics?.categoryBreakdown} />
          <MonthlyBarChart
            expenses={analytics?.monthlyExpenses}
            income={analytics?.monthlyIncome}
          />
        </div>

        {/* Filters */}
        <TransactionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Transactions Table */}
        <div className="mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-3">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                💳 Recent Transactions
              </h2>
            </div>
            {transactions.length > 10 && (
              <button
                onClick={() => setShowAllTransactions(!showAllTransactions)}
                className="btn-primary text-sm shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
              >
                {showAllTransactions
                  ? "Show Less"
                  : `Show All (${transactions.length})`}
              </button>
            )}
          </div>
          <TransactionTable
            transactions={
              showAllTransactions ? transactions : transactions.slice(0, 10)
            }
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            loading={loading}
          />
          {!showAllTransactions && transactions.length > 10 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAllTransactions(true)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                View {transactions.length - 10} more transactions →
              </button>
            </div>
          )}
        </div>

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleAddTransaction}
          transaction={editingTransaction}
          loading={submitting}
        />
      </div>
    </div>
  );
};

export default Dashboard;
