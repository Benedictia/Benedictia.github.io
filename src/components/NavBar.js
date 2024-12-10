import React from 'react';
import { Link } from 'react-router-dom'; 
import '../NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to the HomePage */}
        </li>
        <li>
          <Link to="/signup">Latest Release</Link> {/* Link to the SignUpForm */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
