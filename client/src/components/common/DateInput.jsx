import { useRef } from "react";
import { Calendar } from "lucide-react";

const DateInput = ({ label, error, className = "", value, onChange, ...rest }) => {
  const inputRef = useRef(null);

  const openPicker = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={onChange}
          className={`w-full rounded-field border px-3.5 py-2.5 pr-10 text-sm text-text-heading
            [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute
            [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-10
            [&::-webkit-calendar-picker-indicator]:h-full
            focus:outline-none focus:ring-2 focus:ring-brand-purple/40
            ${error ? "border-red-400" : "border-border-base"}`}
          {...rest}
        />
        <Calendar
          onClick={openPicker}
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-brand-purple"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default DateInput;
