import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({username:name, email, password});
      navigate("/");
    } catch (error) {
      console.log("Register failed", error);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("left-section")}>
        <h1 className={cx("logo")}>Facebook</h1>
        <p className={cx("description")}>
          {" "}
          Connect with friends and the world around on Facebook{" "}
        </p>
      </div>
      <div className={cx('right-section')}>
       
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={cx("input")}
          />
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
          <button type="submit" className={cx("button")}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
