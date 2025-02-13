import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import logo_w from '../../assets/logo_w.png';
import { Link, useLocation } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa6';
import { LuScrollText } from 'react-icons/lu';
import { CgProfile } from 'react-icons/cg';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down: hide the navbar
      setIsHidden(true);
    } else {
      // Scrolling up: show the navbar
      setIsHidden(false);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav className={`navbar ${isHidden ? 'hidden' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="logo">
          <img src={logo_w} alt="Logo" />
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
              <IoHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutgame" className={location.pathname === '/aboutgame' ? 'active' : ''}>
              <LuScrollText className="nav-icon" />
              <span>About Game</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/play" className={location.pathname === '/play' ? 'active' : ''}>
              <FaPlay className="nav-icon" />
              <span>Play</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
              <MdLeaderboard className="nav-icon" />
              <span>Leaderboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              <CgProfile className="nav-icon" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
