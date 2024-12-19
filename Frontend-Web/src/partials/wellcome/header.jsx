import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">Logo</Link>
      </div>
      
      {/* Tombol Login */}
      <div>
        <Link to="/login" className="px-6 py-2 bg-green-600 rounded-lg hover:bg-green-700">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
