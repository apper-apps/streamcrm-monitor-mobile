import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
          className
        )
      }
    >
      {({ isActive }) => (
        <>
          <ApperIcon 
            name={icon} 
            className={cn(
              "h-5 w-5 mr-3 transition-colors duration-200",
              isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
            )} 
          />
          {label}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;