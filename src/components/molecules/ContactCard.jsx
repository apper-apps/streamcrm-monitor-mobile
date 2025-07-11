import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover"
    >
      <div className="flex items-start space-x-4">
        <Avatar
          fallback={getInitials(contact.name)}
          size="lg"
          className="flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {contact.name}
          </h3>
<div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Mail" className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ApperIcon name="Phone" className="h-4 w-4 mr-2 text-gray-400" />
              <span>{contact.phone}</span>
            </div>
            {contact.jobTitle && (
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Briefcase" className="h-4 w-4 mr-2 text-gray-400" />
                <span className="truncate">{contact.jobTitle}</span>
              </div>
            )}
            {contact.company && (
              <div className="flex items-center text-sm text-gray-600">
                <ApperIcon name="Building" className="h-4 w-4 mr-2 text-gray-400" />
                <span className="truncate">{contact.company}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(contact)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit contact"
        >
          <ApperIcon name="Edit" className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(contact)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete contact"
        >
          <ApperIcon name="Trash2" className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ContactCard;