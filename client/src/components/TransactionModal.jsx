import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  formatDateForInput,
} from "../utils/helpers";

const TransactionModal = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
  loading,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "Expense",
    category: "",
    date: formatDateForInput(new Date()),
    note: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: formatDateForInput(transaction.date),
        note: transaction.note || "",
      });
    } else {
      setFormData({
        amount: "",
        type: "Expense",
        category: "",
        date: formatDateForInput(new Date()),
        note: "",
      });
    }
  }, [transaction, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === "type" && { category: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const categories =
    formData.type === "Income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 shadow-2xl border-2 border-primary-200 dark:border-primary-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-2 rounded-lg mr-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {transaction ? "Edit Transaction" : "Add Transaction"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="type" className="label font-semibold">
              💼 Transaction Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              required
            >
              <option value="Income">🟢 Income</option>
              <option value="Expense">🔴 Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="label font-semibold">
              💰 Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-field hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="0.00"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="label font-semibold">
              🏷️ Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="label font-semibold">
              📅 Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="note" className="label font-semibold">
              📝 Note (Optional)
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="input-field resize-none hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
              placeholder="Add a note..."
              rows="3"
              maxLength="200"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formData.note.length}/200 characters
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary shadow-md hover:shadow-lg transition-all"
              disabled={loading}
            >
              ❌ Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner w-4 h-4 border-2 mr-2"></div>
                  Saving...
                </span>
              ) : transaction ? (
                "✅ Update"
              ) : (
                "➕ Add Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
