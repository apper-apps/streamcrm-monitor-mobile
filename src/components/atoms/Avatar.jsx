import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ className, src, alt, fallback, size = "md", ...props }, ref) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };

  if (src) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 font-medium text-white",
        sizes[size],
        className
      )}
      {...props}
    >
      {fallback}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;