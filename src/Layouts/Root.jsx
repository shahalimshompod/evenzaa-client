import React from "react";
import { Outlet } from "react-router";

const Root = () => {
  return (
    <div>
      <h1>Hi, This is root</h1>
      <Outlet />
      <h1>Hi, This is root</h1>
    </div>
  );
};

export default Root;
