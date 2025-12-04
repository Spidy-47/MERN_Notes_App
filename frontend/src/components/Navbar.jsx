import React from "react";

import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold"><Link to="/">MyNotes</Link></div>
        <div className="space-x-3">
          {isAuth ? (
            <>
              <button onClick={handleLogout} className="btn bg-red-500 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn bg-blue-500 text-white">Login</Link>
              <Link to="/register" className="btn bg-green-500 text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
