import React from "react";
import Todo from "./Todo";
import Header from "./header";

const empId = localStorage.getItem("empId");
const token = localStorage.getItem("token");

const Dashboard = () => (
  <>
    <Header />
    <div>
      <h2 className="mt-4 mb-3 text-center">Welcome!</h2>
      <Todo empId={empId} token={token} />
    </div>
  </>
);

export default Dashboard;
