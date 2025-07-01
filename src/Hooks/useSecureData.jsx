import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useSecureData = (endpoint, dependencies = []) => {
  // axios instance
  const axiosSecure = useAxiosSecure();

  // states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch function
  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    try {
      setLoading(true);
      const res = await axiosSecure.get(endpoint);
      
      setData(res?.data);
      setError(null); // reset error
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch secure data");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  // returning data
  return { data, loading, error, refetch: fetchData };
};

export default useSecureData;
