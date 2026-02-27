import { Edit, Trash2, Calendar, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "../utils/helpers";

const TransactionTable = ({ transactions, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-12">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="card bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-primary-600 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No transactions yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start by adding your first transaction
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="card bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-l-4 hover:shadow-xl transition-all duration-300"
            style={{
              borderLeftColor:
                transaction.type === "Income" ? "#10b981" : "#ef4444",
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      transaction.type === "Income"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                    } shadow-md`}
                  >
                    {transaction.type}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                    {transaction.category}
                  </span>
                </div>
                <p
                  className={`text-2xl font-bold ${
                    transaction.type === "Income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 rounded-lg transition-colors shadow-sm"
                  aria-label="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(transaction._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-400 rounded-lg transition-colors shadow-sm"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(transaction.date)}</span>
              </div>
              {transaction.note && (
                <div className="flex items-start text-gray-600 dark:text-gray-400">
                  <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-2">{transaction.note}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block card overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Note
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction._id}
                  className={`hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-primary-900/20 transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-gray-50/50 dark:bg-gray-800/50"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900 text-primary-800 dark:text-primary-200 rounded-full shadow-sm">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {transaction.note || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                        transaction.type === "Income"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-right text-sm font-bold ${
                      transaction.type === "Income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction._id)}
                      className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionTable;
