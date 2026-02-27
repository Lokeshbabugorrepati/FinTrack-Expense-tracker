import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMonthName } from "../utils/helpers";

const MonthlyBarChart = ({ expenses, income }) => {
  if (
    (!expenses || expenses.length === 0) &&
    (!income || income.length === 0)
  ) {
    return (
      <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-xl border-2 border-blue-200 dark:border-blue-700">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg mr-3">
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
            📈 Monthly Overview
          </h3>
        </div>
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No data available
          </p>
        </div>
      </div>
    );
  }

  // Combine income and expense data
  const monthsMap = new Map();

  expenses?.forEach((item) => {
    const key = `${item._id.year}-${item._id.month}`;
    monthsMap.set(key, {
      month: getMonthName(item._id.month),
      year: item._id.year,
      expense: item.total,
      income: 0,
    });
  });

  income?.forEach((item) => {
    const key = `${item._id.year}-${item._id.month}`;
    if (monthsMap.has(key)) {
      monthsMap.get(key).income = item.total;
    } else {
      monthsMap.set(key, {
        month: getMonthName(item._id.month),
        year: item._id.year,
        expense: 0,
        income: item.total,
      });
    }
  });

  const chartData = Array.from(monthsMap.values())
    .sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (
        Object.keys(getMonthName).indexOf(a.month) -
        Object.keys(getMonthName).indexOf(b.month)
      );
    })
    .map((item) => ({
      name: `${item.month} ${item.year}`,
      Expense: item.expense,
      Income: item.income,
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow-2xl border-2 border-blue-200 dark:border-blue-700">
          <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            {payload[0].payload.name}
          </p>
          {payload.map((item, index) => (
            <p
              key={index}
              className="text-sm font-semibold"
              style={{ color: item.color }}
            >
              {item.name}: ₹{item.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 shadow-xl border-2 border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-lg mr-3">
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
          📈 Monthly Overview
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-gray-300 dark:stroke-gray-600"
          />
          <XAxis
            dataKey="name"
            className="text-xs"
            tick={{ fill: "currentColor" }}
          />
          <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Income" fill="#10b981" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
