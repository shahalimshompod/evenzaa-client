// src/hooks/useUser.js
import useSecureData from "./useSecureData";

const useUser = () => {
  // Using the reusable secure data hook
  const { data: userData, loading, error } = useSecureData("/user");

  return { userData, loading, error };
};

export default useUser;
