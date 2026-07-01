import { createContext, useContext, useMemo, useState } from "react";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [appliedCity, setAppliedCity] = useState("");
  const [sort, setSort] = useState("name");

  const value = useMemo(
    () => ({
      search,
      setSearch,
      city,
      setCity,
      appliedCity,
      setAppliedCity,
      sort,
      setSort,
    }),
    [search, city, appliedCity, sort]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used within FilterProvider");
  return ctx;
};
