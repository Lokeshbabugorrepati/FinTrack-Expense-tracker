import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-4rem)] flex items-center"
        style={{ backgroundImage: "url(/bg_expense_tracker.avif)" }}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-left max-w-3xl"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 sm:mb-8 leading-tight tracking-tight">
              Smart Expense Tracker
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 mb-8 sm:mb-10 leading-relaxed font-light">
              Take control of your finances with FinTrack. Track expenses,
              analyze spending patterns, and make informed financial decisions
              with beautiful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-medium text-center rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-10 py-4 text-lg font-medium text-center rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
