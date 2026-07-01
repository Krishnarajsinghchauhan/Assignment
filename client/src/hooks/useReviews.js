import { useCallback, useEffect, useState } from "react";
import { fetchReviews } from "../api/reviewApi.js";

export const useReviews = (companyId, sort) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReviews(companyId, { sort });
      setReviews(data);
    } catch (err) {
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [companyId, sort]);

  useEffect(() => {
    load();
  }, [load]);

  return { reviews, setReviews, loading, error, refresh: load };
};
