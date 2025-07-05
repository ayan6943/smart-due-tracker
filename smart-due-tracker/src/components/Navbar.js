import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      <Link to="/" className="text-xl font-bold text-primary">
        Smart Due Tracker
      </Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium text-muted hover:text-dark">
              Dashboard
            </Link>
            <Link to="/add" className="text-sm font-medium text-muted hover:text-dark">
              Add Due
            </Link>
            <Link to="/profile" className="text-sm font-medium text-muted hover:text-dark">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-sm font-medium text-muted hover:text-dark">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
