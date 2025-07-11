import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  options = [],
  error,
  className,
  ...props 
}) => {
  const renderInput = () => {
    if (type === "select") {
      return (
        <Select 
          name={name} 
          value={value} 
          onChange={onChange}
          className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-100")}
          {...props}
        >
          <option value="">{placeholder || "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      );
    }

    return (
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-100")}
        {...props}
      />
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;