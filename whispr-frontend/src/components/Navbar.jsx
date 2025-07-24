import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#1F2937] text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold text-[#7C3AED]">Whispr</Link>
      {user && (
        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="hover:text-[#5EEAD4] font-medium">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-[#5EEAD4] font-medium">
            Profile
          </Link>
          <Link to="/chat" className="hover:text-[#5EEAD4] font-medium">
            Chat
          </Link>
          <button
            onClick={handleLogout}
            className="bg-[#5EEAD4] text-[#111827] px-3 py-1 rounded-md font-medium hover:bg-[#2dd4bf]"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
