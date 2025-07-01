// src/hooks/useSecureData.js

import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useSecureData = (endpoint, dependencies = []) => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return; // safety check

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(endpoint);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch secure data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, endpoint, ...dependencies]); // rerun if any dependency changes

  return { data, loading, error };
};

export default useSecureData;
