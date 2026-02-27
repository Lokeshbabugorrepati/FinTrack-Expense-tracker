import { Filter } from "lucide-react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/helpers";

const TransactionFilters = ({ filters, onFilterChange }) => {
  const allCategories = [
    ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="card bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10 shadow-xl border-2 border-blue-200 dark:border-blue-700">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg mr-3">
          <Filter className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          🔍 Transaction Filters
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div>
          <label className="label text-xs font-semibold">📅 Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="input-field text-sm hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">All Types</option>
            <option value="Income">🟢 Income</option>
            <option value="Expense">🔴 Expense</option>
          </select>
        </div>

        <div>
          <label className="label text-xs font-semibold">🏷️ Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="input-field text-sm hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-xs font-semibold">📆 Month</label>
          <select
            value={filters.month}
            onChange={(e) => onFilterChange("month", e.target.value)}
            className="input-field text-sm hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">All Months</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-xs font-semibold">📅 Year</label>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange("year", e.target.value)}
            className="input-field text-sm hover:border-primary-400 focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(filters.type || filters.category || filters.month || filters.year) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() =>
              onFilterChange("reset", {
                type: "",
                category: "",
                month: "",
                year: "",
              })
            }
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
          >
            ✖️ Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionFilters;
