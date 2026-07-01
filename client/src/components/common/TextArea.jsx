const TextArea = ({ label, error, className = "", rows = 4, ...rest }) => {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full resize-none rounded-field border px-3.5 py-2.5 text-sm text-text-heading placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-brand-purple/40
          ${error ? "border-red-400" : "border-border-base"}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
