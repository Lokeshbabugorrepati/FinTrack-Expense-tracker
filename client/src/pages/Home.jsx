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
          <div className="text-left max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-4 sm:mb-6 leading-tight">
              Smart Expense Tracker
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 sm:mb-8 leading-relaxed">
              Take control of your finances with FinTrack. Track expenses,
              analyze spending patterns, and make informed financial decisions
              with beautiful analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-center rounded-lg font-normal transition-colors shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg text-center rounded-lg font-normal transition-colors shadow-md"
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
