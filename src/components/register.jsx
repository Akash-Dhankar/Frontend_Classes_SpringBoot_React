import { useState } from "react";
import axios from "axios";
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: ["ROLE_ADMIN"]
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const res = await axios.post("https://springboot-classes.onrender.com/api/auth/register", formData);
      console.log("Registered:", res.data);
      alert("Registration Successful");
    } catch (e) {
      console.error("Registration Error", e);
      alert("Registration Failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          type="text"
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={formData.email}
          type="text"
          onChange={handleChange}
        />

        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          name="userName"
          value={formData.userName}
          type="text"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={formData.password}
          type="password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
