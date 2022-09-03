/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import {
  Navbar, Dropdown, Avatar, Button,
} from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContextProvider';

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
    <div className="mt-6 mb-11">
      <Navbar
        fluid
        rounded
        className="py-4 w-full bg-white dark:bg-gray-900"
      >
        <Navbar.Brand href="/">
          <img
            src={LOGO_URL}
            className="h-6 sm:h-9"
            alt="AYJ Logo"
          />
          <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
            AYJ Clubs
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 z-50">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={currentUser ? currentUser.photoURL : ''} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentUser ? currentUser.displayName : ''}
                </span>
                <span className="block truncate text-sm font-medium">
                  {currentUser ? currentUser.email : ''}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to="">My Favorites</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="">Settings</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <button onClick={handleLogout} type="button">Logout</button>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex md:order-2">
              <Button onClick={handleLogin} type="submit">
                Login

              </Button>
            </div>
          )}


          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            active={location.pathname === '/'}
          >
            <h1 className="text-xl">Home</h1>

          </Navbar.Link>
          <Navbar.Link
            href="/clubs"
            active={location.pathname === '/clubs'}
          >
            <h1 className="text-xl">Clubs</h1>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            <h1 className="text-xl">Events</h1>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            <h1 className="text-xl">Contact</h1>
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            <h1 className="text-xl">Staff</h1>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default CustomNavbar;
