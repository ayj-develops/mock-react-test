/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContextProvider';

export const NavbarRoutes = [
  {
    name: 'Home',
    route: '/',
    isDropdown: false,
  },
  {
    name: 'Clubs',
    route: '/clubs',
    isDropdown: false,
  },
  {
    name: 'News',
    route: '/news',
    isDropdown: false,
  },
  {
    name: 'Staff',
    route: '/staff',
    isDropdown: true,
  },
  {
    name: 'All events',
    route: '/events',
    isDropdown: true,
  },
  {
    name: 'Contact Us',
    route: '/contact',
    isDropdown: true,
  },
];

const LOGO_URL = `${process.env.PUBLIC_URL}/ayjImage.png`;

function CustomNavbar() {
  const {
    loginWithGoogle, logout, currentUser,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate('/');
  };
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/">
          <img alt="" src={LOGO_URL} width="auto  " height="48" className="p-1" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              NavbarRoutes.map((obj) => (
                obj.isDropdown ? null : <li className="nav-item"><Link className="nav-link" to={obj.route}>{obj.name}</Link></li>
              ))
            }

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                More
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                  NavbarRoutes.map((obj) => (
                    obj.isDropdown ? <li><Link className="dropdown-item" to={obj.route}>{obj.name}</Link></li> : null
                  ))
                }
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Report an Issue</a></li>
              </ul>
            </li>
          </ul>
          {
            currentUser ? <button className="btn btn-outline-primary" onClick={handleLogout} type="button">Logout</button> : <button className="btn btn-outline-primary" onClick={handleLogin} type="button">Login</button>
          }
        </div>
      </div>
    </nav>
  );
}
export default CustomNavbar;
