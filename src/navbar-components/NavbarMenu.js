import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SSLogo from '../logo/logo_2-removebg.png';
import '../styles/navbarstyle.css'

function NavbarMenu() {
  const location = useLocation();
  const username = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    //sessionStorage.removeItem('username');
    sessionStorage.clear();
    window.location.reload();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/" className="mr-auto">
        <img
            alt="StopShop logo"
            src={SSLogo}
            height="100px"
            className="d-inline-block align-top me-2"
          />
        </Navbar.Brand>
        <Nav className="me-auto subMenuNav">
          <Nav.Link href="/order">Order</Nav.Link>
          {username ? (
            <Nav.Link href="/account">Account</Nav.Link>
          ) : (
            ''
          )}
        </Nav>

        <Navbar.Collapse className="justify-content-end welcomeNav">
          {username ? (
            <>
              <span className="me-2">Welcome, {username}</span>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline-light" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;