import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/contacts":
        return "Contacts";
      case "/companies":
        return "Companies";
      case "/deals":
        return "Deals";
      default:
        return "Dashboard";
    }
  };

  const getPageDescription = () => {
    switch (location.pathname) {
      case "/contacts":
        return "Manage your customer contacts and relationships";
      case "/companies":
        return "Track companies and business opportunities";
      case "/deals":
        return "Monitor your sales pipeline and deals";
      default:
        return "Welcome to your CRM dashboard";
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-gray-600">{getPageDescription()}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ApperIcon name="Calendar" className="h-4 w-4" />
              <span>{new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;