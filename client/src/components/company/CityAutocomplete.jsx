import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { INDIAN_CITIES } from "../../utils/indianCities.js";

const CityAutocomplete = ({
  label,
  labelClassName = "font-medium text-text-muted",
  value,
  onChange,
  onSelectCity,
  placeholder = "Search a city...",
  className = "",
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

  const query = value.trim().toLowerCase();
  const suggestions = query
    ? INDIAN_CITIES.filter((city) => city.toLowerCase().includes(query)).slice(0, 8)
    : [];

  const handleSelect = (city) => {
    onChange(city);
    onSelectCity(city);
    setOpen(false);
  };

  return (
    <div className={className} ref={containerRef}>
      {label && (
        <label className={`mb-1.5 block text-sm ${labelClassName}`}>{label}</label>
      )}
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-field border border-border-base px-3.5 py-2.5 pr-10 text-sm text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
        />
        <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />

        {open && suggestions.length > 0 && (
          <ul className="absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-field border border-border-base bg-white py-1 shadow-card">
            {suggestions.map((city) => (
              <li key={city}>
                <button
                  type="button"
                  onClick={() => handleSelect(city)}
                  className="block w-full px-3.5 py-2 text-left text-sm text-text-heading hover:bg-gray-50"
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CityAutocomplete;
