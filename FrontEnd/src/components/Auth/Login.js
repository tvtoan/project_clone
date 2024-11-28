import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/home"; 
      }
      
    } catch (error) {
      setError(
        error.response
          ? error.response.data.message
          : "login failed, please try again."
      );
      console.log("Login failed", error);
    }
  };

  return (
    <div className={cx("login-page")}>
      <div className={cx("left-section")}>
        <h1 className={cx("logo")}>Facebook</h1>
        <p className={cx("description")}>
          {" "}
          Connect with friends and the world around on Facebook{" "}
        </p>
      </div>
      <div className={cx("right-section")}>
        <form onSubmit={handleLogin} className={cx("form")}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cx("input")}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cx("input")}
          />
          <button type="submit" className={cx("login-button")}>
            Login
          </button>
          <a href="#" className={cx("forgot-password")}>
            {" "}
            Forgot password
          </a>
          <div className={cx("line")}></div>
          <button
            type="button"
            className={cx("register-button")}
            onClick={() => navigate("/register")}
          >
            Create New Account
          </button>
        </form>
      </div>

      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
