import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiPackage, FiShoppingCart, FiLogIn, FiUserPlus, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg'; 
import {useTheme} from '../context/ThemeContext';
import "../styles/main.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const getActiveClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <header className="header">
      <div className='header_container'>
        <Link to="/" className="header_logo">Terminal <span>Goods</span></Link>

        <nav className={`header_nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" className={getActiveClass} onClick={() => setMenuOpen(false)}> <AiOutlineHome/> Home</NavLink>
          <NavLink to="/products" className={getActiveClass} onClick={() => setMenuOpen(false)}> <FiPackage/> Products</NavLink>
          <NavLink to="/profile" className={getActiveClass} onClick={() => setMenuOpen(false)}> <CgProfile/> Profile</NavLink>
          <NavLink to="/cart" className={getActiveClass} onClick={() => setMenuOpen(false)}> <FiShoppingCart/> Cart</NavLink>
          <NavLink to="/login" className={getActiveClass} onClick={() => setMenuOpen(false)}> <FiLogIn/> Login</NavLink>
          <NavLink to="/register" className={getActiveClass} onClick={() => setMenuOpen(false)}> <FiUserPlus/> Register</NavLink>
        </nav>

        <button className="menu_toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
         <button className="theme_toggle" onClick={toggleTheme}>
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
