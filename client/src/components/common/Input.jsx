const Input = ({
  label,
  icon: Icon,
  error,
  className = "",
  labelClassName = "font-medium text-text-muted",
  ...rest
}) => {
  return (
    <div className={className}>
      {label && (
        <label className={`mb-1.5 block text-sm ${labelClassName}`}>{label}</label>
      )}
      <div className="relative">
        <input
          className={`w-full rounded-field border px-3.5 py-2.5 text-sm text-text-heading placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-brand-purple/40
            ${error ? "border-red-400" : "border-border-base"}
            ${Icon ? "pr-10" : ""}`}
          {...rest}
        />
        {Icon && (
          <Icon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
