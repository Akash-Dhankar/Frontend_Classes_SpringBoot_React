import { useState } from "react";
import axios from "axios"; 
import Header from '../components/header'

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
  event.preventDefault();
  try {
    const response = await axios.post("https://ems-latest-1.onrender.com/api/auth/login", { userName, password });
    console.log(response.data);

    localStorage.setItem("token", response.data.token);

    alert("Login Successful");
  } catch (e) {
    console.log("Login Error", e);
    alert("Invalid Credentials");
  }
  console.log("Form Submitted");
}

  return (
    <>
      <Header />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="card p-4 shadow" style={{ minWidth: "320px", maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">User Name</label>
              <input
                id="userName"
                name="userName"
                value={userName}
                type="text"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
