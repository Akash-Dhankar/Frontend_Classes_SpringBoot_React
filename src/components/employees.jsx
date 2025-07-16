import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view employees");
      return;
    }

    axios.get("https://spring-boot-application2-latest.onrender.com/employeeJWT", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setEmployees(res.data);
    })
    .catch(err => {
      setError("Failed to fetch employees");
      console.error(err);
    });
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Employee List</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {!error && (
          <ul className="list-group">
            {employees.length === 0 ? (
              <li className="list-group-item">No employees found.</li>
            ) : (
              employees.map(emp => (
                <li className="list-group-item" key={emp.empId}>
                  {emp.name} ({emp.userName})
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Employees;
