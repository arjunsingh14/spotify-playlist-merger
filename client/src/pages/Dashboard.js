import React from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = ({ code }) => {
  const token = useAuth(code)
  return <div>{code}</div>;
};

export default Dashboard;
