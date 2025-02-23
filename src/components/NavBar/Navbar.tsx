import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import logo_w from '../../assets/logo_w.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TbHome } from "react-icons/tb";
import { SlGameController } from "react-icons/sl";
import { PiRankingDuotone } from "react-icons/pi";
import { CgProfile } from 'react-icons/cg';
import { PiSignInThin } from "react-icons/pi";
import { FiMenu, FiX } from 'react-icons/fi';
import { TbMedal } from "react-icons/tb";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for user data in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  // Helper function: Convert a relative image path to an absolute URL.
  const getImageUrl = (imagePath: string): string => {
    // If the path already starts with "http", assume it's a full URL.
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Otherwise, extract the filename and prepend your static files URL.
    const filename = imagePath.split('/').pop();
    return `http://localhost:5001/uploads/${filename}`;
  };

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

  // Sign-out handler: clear token and user data and redirect
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/sign-in');
  };

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
              <TbHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/badges" className={location.pathname === '/badges' ? 'active' : ''}>
              <TbMedal className="nav-icon" />
              <span>Badges</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/play" className={location.pathname === '/play' ? 'active' : ''}>
              <SlGameController className="nav-icon" />
              <span>Play</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
              <PiRankingDuotone className="nav-icon" />
              <span>Leaderboard</span>
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item " id='profile-link'>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                  {user.image ? (
                    <img
                      src={getImageUrl(user.image)}
                      alt={user.username}
                      className="nav-user-img"
                    />
                  ) : (
                    <CgProfile className="nav-icon" />
                  )}
                  <span>{user.username}</span>
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleSignOut} className="signout-btn">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <button >
              <Link to="/sign-up" className={location.pathname === '/sign-up' ? 'active' : ''}>
               
                <span className='signup-btn'> Sign Up</span>
              </Link>
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;