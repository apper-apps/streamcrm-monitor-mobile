import { useState } from "react";
import { motion } from "framer-motion";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: "/contacts", icon: "Users", label: "Contacts" },
    { to: "/companies", icon: "Building2", label: "Companies" },
    { to: "/deals", icon: "Target", label: "Deals" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleMobileMenu}
          className="p-2 shadow-lg"
        >
          <ApperIcon name="Menu" className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">StreamCRM</h1>
                <p className="text-xs text-gray-600">Customer Management</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-1"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
        </nav>
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 h-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">StreamCRM</h1>
              <p className="text-xs text-gray-600">Customer Management</p>
            </div>
          </div>
        </div>

        <nav className="p-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;