import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getCategoryColor } from "../utils/helpers";

const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-xl border-2 border-purple-200 dark:border-purple-700">
        <div className="flex items-center mb-4">
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
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            📊 Expense by Category
          </h3>
        </div>
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📭</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No expense data available
          </p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item._id,
    value: item.total,
    color: getCategoryColor(item._id, index),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow-2xl border-2 border-purple-200 dark:border-purple-700">
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            {payload[0].name}
          </p>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-xl border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
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
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          📊 Expense by Category
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
