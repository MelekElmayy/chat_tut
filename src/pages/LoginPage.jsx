import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await handleUserLogin(e, credentials);
    } catch (error) {
      setError(error.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field--wrapper">
            <label>Email:</label>
            <input 
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Password:</label>
            <input 
              required
              type="password"
              name="password"
              placeholder="Enter password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input 
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>

        <p>Don't have an account ? Register <Link to='/register'>here</Link></p>
      </div>
    </div>
  );
}

export default LoginPage;