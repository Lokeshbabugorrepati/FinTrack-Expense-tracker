import { formatCurrency } from "../utils/helpers";

const SummaryCard = ({ title, amount, icon: Icon, gradient, textColor }) => {
  return (
    <div
      className={`card ${gradient} transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl border-0`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2">
            {title}
          </p>
          <p
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${textColor} drop-shadow-lg`}
          >
            {formatCurrency(amount)}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-lg">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
