import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editEmpId, setEditEmpId] = useState(null);    
  const [editForm, setEditForm] = useState({});         

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view employees");
      return;
    }

    axios
      .get("https://ems-latest-1.onrender.com/employeeJWT", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch employees");
        console.error(err);
      });
  }, [token]);

  const deleteEmployee = async (empId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`https://ems-latest-1.onrender.com/employeeJWT/${empId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Employee deleted successfully");
      setEmployees((prev) => prev.filter((emp) => emp.empId !== empId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee");
    }
  };

  const startEdit = (emp) => {
    setEditEmpId(emp.empId);
    setEditForm({
      name: emp.name,
      userName: emp.userName,
    });
  };

  const saveEdit = async (empId) => {
    try {
      const updatedEmployee = { ...editForm, empId };
      await axios.put(
        `https://ems-latest-1.onrender.com/employeeJWT/${empId}`,
        updatedEmployee,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.empId === empId ? { ...emp, ...editForm } : emp
        )
      );
      alert("Employee updated successfully");
      setEditEmpId(null);
      setEditForm({});
    } catch (err) {
      console.error(err);
      alert("Failed to update employee");
    }
  };

  const cancelEdit = () => {
    setEditEmpId(null);
    setEditForm({});
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (                                    //---------23IT003-AKASH DHANKAR------
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Employee List</h2>
        {!error && (
          <div className="mb-3 d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "300px" }}
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        {!error && (
          <ul className="list-group">
            {filteredEmployees.length === 0 ? (
              <li className="list-group-item">No employees found.</li>
            ) : (
              filteredEmployees.map((emp) =>
                editEmpId === emp.empId ? (
                  <li
                    key={emp.empId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ background: "#f5f4f2" }}
                  >
                    <div>
                      <strong>ID:</strong> {emp.empId} &nbsp;
                      <strong>Name:</strong>{" "}
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditInputChange}
                        style={{ width: "120px", marginRight: 12 }}
                      />
                      <strong>Username:</strong>{" "}
                      <input
                        type="text"
                        name="userName"
                        value={editForm.userName}
                        onChange={handleEditInputChange}
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(emp.empId)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </li>
                ) : (
                  <li
                    key={emp.empId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>ID:</strong> {emp.empId} &nbsp;
                      <strong>Name:</strong> {emp.name} &nbsp;
                      <strong>Username:</strong> ({emp.userName})
                    </div>
                    <div>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => startEdit(emp)}
                      >
                        Edit
                      </button>
                      {roles.includes("ROLE_ADMIN") && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteEmployee(emp.empId)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </li>
                )
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Employees;
