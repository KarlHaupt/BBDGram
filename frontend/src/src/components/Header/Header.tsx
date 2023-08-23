import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';

const Header: React.FC = () => {
  return (
    <nav className="header-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">BBDGram</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header