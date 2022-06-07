/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

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

function Navbar({ logoUrl }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img alt="" src={logoUrl} width="auto  " height="28" />
        </Link>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {
            NavbarRoutes.map((obj) => (
              obj.isDropdown ? null : <Link className="navbar-item" to={obj.route}>{obj.name}</Link>
            ))
          }

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>

            <div className="navbar-dropdown">
              {
                NavbarRoutes.map((obj) => (
                  obj.isDropdown ? <Link className="navbar-item" to={obj.route}>{obj.name}</Link> : null
                ))
              }
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/login" className="button is-primary">
                <strong>Log in</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
