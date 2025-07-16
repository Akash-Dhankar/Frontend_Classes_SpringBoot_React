import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view employees");
      return;
    }

    axios.get("https://ems-latest-1.onrender.com/employeeJWT", {
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
  }, [token]);

  const editEmployee = (empId) => {
    alert(`Edit functionality not implemented yet for employeeId: ${empId}`);
  };

  const deleteEmployee = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`https://ems-latest-1.onrender.com/employeeJWT/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Employee deleted successfully");
      setEmployees(employees.filter(emp => emp.empId !== empId)); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

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
                <li key={emp.empId} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    {emp.name} ({emp.userName})
                  </div>
                  <div>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => editEmployee(emp.empId)}>Edit</button>
                    {roles.includes("ROLE_ADMIN") && (
                      <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.empId)}>Delete</button>
                    )}
                  </div>
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
