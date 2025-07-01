import { useContext } from "react";
import { StateManagementContext } from "../Contexts/StateContext";
import { useEffect } from "react";

export default function useAuth() {
  // login state
  const states = useContext(StateManagementContext);
  const { setIsLoggedIn, isLoggedIn } = states;

  useEffect(() => {
    const token = localStorage.getItem("user_access_token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  return { isLoggedIn };
}
