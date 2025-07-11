import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const CompanyCard = ({ company }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center">
            <ApperIcon name="Building2" className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {company.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Briefcase" className="h-4 w-4 mr-2 text-gray-400" />
            <span>{company.industry}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;