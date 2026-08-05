import { Link, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successfully");

    navigate("/login");

  };

  return (
    <header>
      <nav className="navbar">

        <div className="logo">
          <h2>AI Resume Analyzer</h2>
        </div>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <Link to="/upload">Upload Resume</Link>
          </li>

          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

        </ul>

        {
          token ? (
            <button
              className="nav-login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-login-btn">
              Login
            </Link>
          )
        }

      </nav>
    </header>
  );
}

export default Navbar;