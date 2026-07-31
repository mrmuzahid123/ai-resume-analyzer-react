import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch("http://127.0.0.1:5000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })

      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(data.message);

      }

    } catch (error) {

      alert("Server Error");

    }

    setLoading(false);

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back</h2>

        <p className="login-text">
          Login to continue using AI Resume Analyzer
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <div className="login-options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="#">Forgot Password?</Link>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="register-link">

          Don't have an account?

          <Link to="/register"> Register</Link>

        </p>

      </div>

    </div>

  );

}

export default Login;