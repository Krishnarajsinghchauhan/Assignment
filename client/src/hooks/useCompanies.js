import { useCallback, useEffect, useState } from "react";
import { fetchCompanies } from "../api/companyApi.js";

export const useCompanies = ({ search, city, sort }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCompanies({ search, city, sort });
      setCompanies(data);
    } catch (err) {
      setError(err.message || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  }, [search, city, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return { companies, loading, error, refresh: load };
};
