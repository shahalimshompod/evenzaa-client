import React, { createContext, useState } from "react";

export const StateManagementContext = createContext();
const StateContext = ({ children }) => {
  // login modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  //   loading states of buttons
  const [registerLoader, setRegisterLoader] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);

  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user_access_token")
  );

  const data = {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginLoader,
    setLoginLoader,
    registerLoader,
    setRegisterLoader,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <StateManagementContext.Provider value={data}>
      {children}
    </StateManagementContext.Provider>
  );
};

export default StateContext;
