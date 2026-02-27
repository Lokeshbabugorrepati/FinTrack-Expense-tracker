import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="relative bg-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-16 sm:py-20 lg:py-24 bg-cover bg-center" style={{ backgroundImage: 'url(/bg_expense_tracker.avif)' }}>
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Smart Expense Tracker
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Take control of your finances with FinTrack. Track expenses,
              analyze spending patterns, and make informed financial decisions
              with beautiful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg inline-block rounded-lg font-medium transition-colors shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 text-lg inline-block rounded-lg font-medium transition-colors shadow-md"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
