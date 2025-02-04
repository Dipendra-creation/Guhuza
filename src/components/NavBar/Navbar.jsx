import './Navbar.css';
import logo_dark from '../../assets/logo_w.png';
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { LuScrollText } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current URL

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="logo">
          <img src={logo_dark} alt="logo" />
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li className="nav-item">
            <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>
              <IoHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className={location.pathname === "/leaderboard" ? "active" : ""}>
              <MdLeaderboard className="nav-icon" />
              <span>Leaderboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/play" className={location.pathname === "/play" ? "active" : ""}>
              <FaPlay className="nav-icon" />
              <span>Play</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutgame" className={location.pathname === "/aboutgame" ? "active" : ""}>
              <LuScrollText className="nav-icon" />
              <span>About Game</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
              <CgProfile className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;