import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectDropdown = ({
  label,
  options,
  value,
  onChange,
  icon: Icon,
  placeholder = "Select...",
  className = "",
  labelClassName = "font-medium text-text-muted",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={className} ref={containerRef}>
      {label && (
        <label className={`mb-1.5 block text-sm ${labelClassName}`}>{label}</label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-field border border-border-base bg-white px-3.5 py-2.5 text-left text-sm text-text-heading focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
        >
          <span className={selected ? "" : "text-text-muted"}>
            {selected ? selected.label : placeholder}
          </span>
          {Icon ? (
            <Icon className="h-4 w-4 shrink-0 text-brand-purple" />
          ) : (
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {open && (
          <ul className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-field border border-border-base bg-white py-1 shadow-card">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2 text-left text-sm hover:bg-gray-50 ${
                    option.value === value
                      ? "font-medium text-brand-purple"
                      : "text-text-heading"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectDropdown;
