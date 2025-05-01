import React, { useEffect, useState } from "react";
import { userAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { user } = userAuth();
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]); // Added dependencies to useEffect

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Correctly get name and value
    setcredentials({ ...credentials, [name]: value });
    console.log("credentials", credentials);
  };

  

  return (
    <div className="auth--continer">
      <div className="form--wrapper">
        <form>
          <div className="field--wrapper">
            <label>Email: </label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter Your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Password: </label>
            <input
              type="password"
              required
              name="password" // Fixed name attribute
              placeholder="Enter Your password..."
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;