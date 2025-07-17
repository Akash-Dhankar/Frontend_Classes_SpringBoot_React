import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialTodo = {
  title: "",
  description: "",
  status: "Yet To Do"
};

const STATUS_OPTIONS = ["Yet To Do", "In Progress", "Completed"];

const AddTask = () => {
  const [todo, setTodo] = useState(initialTodo);
  const [loading, setLoading] = useState(false);

  const empId = localStorage.getItem("empId");
  const token = localStorage.getItem("token");
  console.log('empId:', empId); 
    if (!empId) {
    alert("User session invalid. Please log in again.");
    return; 
    }
  const navigate = useNavigate();

  const handleChange = (e) => {                             //---------------23IT003--------------------
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `https://ems-latest-1.onrender.com/employee/${empId}/todos`,
        todo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Task added!");
      navigate("/dashboard"); 
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={todo.title}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={todo.description}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={todo.status}
            onChange={handleChange}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
