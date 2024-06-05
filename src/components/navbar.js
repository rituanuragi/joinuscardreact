import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.css"; // Add styles as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/display-bankers" className="nav-link">
        Show Bankers
      </Link>
      <Link to="/display-dsas" className="nav-link">
        Show DSAs
      </Link>
      <Link to="/display-channelpartners" className="nav-link">
        Show Channel Partners
      </Link>
    </nav>
  );
};

export default Navbar;
