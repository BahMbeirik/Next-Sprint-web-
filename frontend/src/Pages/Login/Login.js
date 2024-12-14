import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/projects', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/token/", { username, password })
      .then((response) => {
        toast.success("Logined Successfuly!");
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        navigate('/projects', { replace: true });
        
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        toast.error("Information incorrect!");
      });
  };

  return (
    <div className="bodyL">
    <ToastContainer />
      <div className="containerL">
        <div className="screen">
          <div className="screen__content">
            <h1>Login</h1>
            <form className="login" onSubmit={handleSubmit}>
              <div className="login__field">
                <FaUser className="login__icon" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="login__field">
                <FaLock className="login__icon" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Log In Now</span>
                <FaChevronRight className="button__icon" />
              </button>
            </form>
            <p className="registerH">
              Don't have an account? <Link className="TRH" to="/register">Register here</Link>
            </p>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

