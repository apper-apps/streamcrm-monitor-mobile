import { motion } from "framer-motion";
import React from "react";
import ApperIcon from "@/components/ApperIcon";

const CompanyCard = ({ company, onEdit, onDelete }) => {
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
<div className="flex items-center text-sm text-gray-600 mb-2">
            <ApperIcon name="Briefcase" className="h-4 w-4 mr-2 text-gray-400" />
            <span>{company.industry}</span>
          </div>
          
          {company.website && (
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <ApperIcon name="Globe" className="h-4 w-4 mr-2 text-gray-400" />
              <a 
                href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 truncate"
              >
                {company.website}
              </a>
            </div>
          )}
          
          {company.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Phone" className="h-4 w-4 mr-2 text-gray-400" />
              <span>{company.phone}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(company)}
          className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
        >
          <ApperIcon name="Edit3" className="h-4 w-4 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(company)}
          className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
        >
          <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default CompanyCard;