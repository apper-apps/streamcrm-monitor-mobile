import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const DealCard = ({ deal }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageColor = (stage) => {
    const stageColors = {
      "Prospecting": "bg-gradient-to-r from-yellow-400 to-orange-500",
      "Qualification": "bg-gradient-to-r from-blue-400 to-blue-600",
      "Proposal": "bg-gradient-to-r from-purple-400 to-purple-600",
      "Negotiation": "bg-gradient-to-r from-pink-400 to-pink-600",
      "Closed Won": "bg-gradient-to-r from-green-400 to-green-600",
      "Closed Lost": "bg-gradient-to-r from-red-400 to-red-600",
    };
    return stageColors[stage] || "bg-gray-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Target" className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
              {deal.name}
            </h3>
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="DollarSign" className="h-4 w-4 mr-1 text-gray-400" />
              <span className="font-medium text-gray-900">{formatCurrency(deal.value)}</span>
            </div>
          </div>
        </div>
        <Badge className={`${getStageColor(deal.stage)} text-white font-medium`}>
          {deal.stage}
        </Badge>
      </div>
    </motion.div>
  );
};

export default DealCard;