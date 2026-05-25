import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./App.css"

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const navStyle = ({ isActive }) => ({
    color: "white",
    textDecoration: "none",
    padding: "5px 10px",
    borderBottom: isActive ? "2px solid white" : "none",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/searchBox?q=${trimmed}`);
    setQuery(""); // clear input after search
  };

  return (
    <header className='Header' style={{ background: "#111" }}>
      <nav className="container d-flex justify-content-between align-items-center p-3">
        
        {/* Logo */}
        <NavLink className="containers" to="/" style={navStyle}>
          <strong>KY</strong>
        </NavLink>

        {/* Search */}
        <form onSubmit={handleSearch} className="formss d-flex gap-2">
          <input className="search"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <div className="d-flex gap-3">
          <NavLink to="/project" style={navStyle}>
            Projects
          </NavLink>

          <NavLink to="/about" style={navStyle}>
            About
          </NavLink>

          <NavLink to="/contact" style={navStyle}>
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;