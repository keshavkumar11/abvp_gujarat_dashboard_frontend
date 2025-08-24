// src/components/layout/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-orange-600 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          ABVP Gujarat
        </Link>
        <Link to="/login" className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-orange-100 transition duration-300">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;