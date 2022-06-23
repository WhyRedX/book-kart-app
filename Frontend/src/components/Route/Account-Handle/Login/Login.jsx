import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import "../Account.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axiSos";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = () => {
    error && toast.error("Invalid email or password", { duration: 1500 })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      const { data } = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem("userinfo", JSON.stringify(data));
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <section id="login-section">
      <div className="login-container container-lr center">
        {error && <Toaster toastOptions={{
            style: {
              border: "0",
              padding: "16px",
              color: "#fff",
              backgroundColor: "#d20e0f",
            },
          }}/>}
        <div className="login-head head-lr">
          <h1>
            Your <span>Account</span>
          </h1>
        </div>
        <div className="login-form form-lr center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-control"
              placeholder="Email/Mobile Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="login-footer footer-lr">
              <p>
                Don't have an account? <Link to="/register">Create one.</Link>
              </p>
              <input type="submit" className="box-shadow" value="Login" onClick={notify} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
