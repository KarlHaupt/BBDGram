import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css';

const Header: React.FC = () => {
  return (
    <header>
      <section className='heading'>
        <img alt="bbd-gram-logo" src={process.env.PUBLIC_URL + '/bbdgram512.png'}/>
        <h1>BBD-GRAM</h1> 
      </section>
      <nav>           
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">BBDGram</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
    
  );
};
export default Header