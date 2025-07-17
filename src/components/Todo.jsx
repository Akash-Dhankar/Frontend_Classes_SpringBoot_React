import { useState, useEffect } from "react";
import axios from "axios";

const STATUS_OPTIONS = [
  { value: "Yet To Do", label: "Yet To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" }
];

const Todo = ({ empId, token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://ems-latest-1.onrender.com/todos/of/${empId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [empId, token]);

  const handleStatusChange = (todoId, newStatus) => {
    axios.put(
      `https://ems-latest-1.onrender.com/todos/${todoId}/status?status=${encodeURIComponent(newStatus)}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === todoId ? { ...todo, status: newStatus } : todo
          )
        );
      })
      .catch(() => alert("Failed to update status"));
  };

  if (loading) {
    return <div className="text-center my-4">Loading...</div>;
  }

  return (
    <div className="container my-4">
      <h3 className="mb-3">My Tasks</h3>
      <div className="list-group">
        {todos.length === 0 && (
          <div className="list-group-item text-center">No tasks found.</div>
        )}
        {todos.map(todo => (
          <div key={todo.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h5 className="mb-1">{todo.title}</h5>
                <p className="mb-1">{todo.description}</p>
              </div>
              <div>
                <label className="me-2 mb-0 fw-bold">Status:</label>
                <select
                  className="form-select d-inline-block"
                  style={{ width: 150 }}
                  value={todo.status}
                  onChange={e => handleStatusChange(todo.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
