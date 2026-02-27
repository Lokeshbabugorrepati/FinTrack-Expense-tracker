import { Link } from "react-router-dom";
import { TrendingUp, PieChart, Shield, Smartphone } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-6">
              <span className="text-6xl sm:text-7xl lg:text-8xl">💰</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
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
                className="btn-primary px-8 py-4 text-lg inline-block shadow-xl hover:shadow-2xl"
              >
                ✨ Get Started Free
              </Link>
              <Link
                to="/login"
                className="btn-secondary px-8 py-4 text-lg inline-block shadow-lg hover:shadow-xl"
              >
                🔑 Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-12 sm:mb-16">
            ✨ Why Choose FinTrack?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-primary-900/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary-100 dark:border-primary-800">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:rotate-6 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Track Everything
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Monitor all your income and expenses in one place with ease
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 dark:border-green-800">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:rotate-6 transition-transform">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Visual Analytics
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Beautiful charts and graphs to understand your spending patterns
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 dark:border-purple-800">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:rotate-6 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your financial data is encrypted and completely secure
              </p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100 dark:border-orange-800">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:rotate-6 transition-transform">
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            🚀 Ready to Take Control of Your Finances?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their money smarter
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 transform"
          >
            ✨ Start Tracking Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
