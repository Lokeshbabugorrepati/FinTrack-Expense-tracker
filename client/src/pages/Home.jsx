import { Link } from "react-router-dom";
import { TrendingUp, PieChart, Shield, Smartphone } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6">
              <span className="text-6xl sm:text-7xl lg:text-8xl text-blue-600">₹</span>
            </div>
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
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg inline-block rounded-lg font-medium transition-colors shadow-md"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 text-lg inline-block rounded-lg font-medium transition-colors shadow-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 bg-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 sm:mb-16">
            Why Choose FinTrack?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-white dark:from-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Track Everything
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Monitor all your income and expenses in one place with ease
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:from-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Visual Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Beautiful charts and graphs to understand your spending patterns
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:from-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your financial data is encrypted and completely secure
              </p>
            </div>

            <div className="text-center p-6 bg-white dark:from-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Mobile Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Access your finances anywhere, anytime on any device
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
