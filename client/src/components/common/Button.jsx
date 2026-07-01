import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  gradient:
    "bg-brand-gradient text-white hover:opacity-90 focus-visible:ring-brand-purple",
  dark: "bg-dark-btn text-white hover:opacity-90 focus-visible:ring-dark-btn",
  ghost:
    "bg-transparent text-text-heading border border-border-base hover:bg-gray-50 focus-visible:ring-border-base",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const Button = ({
  children,
  variant = "gradient",
  size = "md",
  fullWidth = false,
  loading = false,
  icon: Icon,
  className = "",
  disabled,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-field font-medium transition
        disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
        ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.gradient}
        ${SIZE_CLASSES[size] || SIZE_CLASSES.md}
        ${fullWidth ? "w-full" : ""}
        ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  );
};

export default Button;
