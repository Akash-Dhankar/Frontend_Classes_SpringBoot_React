import { useState } from "react";
import axios from "axios";
import Header from "../components/header"; 

const rolesList = [
  { label: "Admin", value: "ROLE_ADMIN" },
  { label: "User", value: "ROLE_USER" }
];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const updatedRoles = checked
        ? [...prev.roleNames, value]
        : prev.roleNames.filter(role => role !== value);
      return { ...prev, roleNames: updatedRoles };
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://spring-boot-application2-latest.onrender.com/api/auth/register", formData);
      alert("Registration Successful");
    } catch (e) {
      alert("Registration Failed");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow" style={{ minWidth: "360px", maxWidth: "450px", width: "100%" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={formData.name} 
                onChange={handleChange} 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Username</label>
              <input 
                id="userName" 
                name="userName" 
                type="text" 
                value={formData.userName} 
                onChange={handleChange} 
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password} 
                onChange={handleChange}
                className="form-control"
                required 
              />
            </div>

            <div className="mb-4">
              <label className="form-label d-block">Roles</label>
              <div>
                {rolesList.map(role => (
                  <div className="form-check form-check-inline" key={role.value}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={role.value}
                      value={role.value}
                      checked={formData.roleNames.includes(role.value)}
                      onChange={handleRoleChange}
                    />
                    <label className="form-check-label" htmlFor={role.value}>
                      {role.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
