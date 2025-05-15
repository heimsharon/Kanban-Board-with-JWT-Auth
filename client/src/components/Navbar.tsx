// Path: client/src/components/Navbar.tsx
// This file is used to create the navbar component

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button">
              <Link className="nav-link" to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <button type="button" onClick={() => auth.logout()}>
              <Link className="nav-link" to="/">Logout</Link>
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar;
