import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NavbarMenu() {
  const location = useLocation();
  const username = sessionStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    window.location.reload();
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">ROB's Store</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/order">Order</Nav.Link>
          {username ? (
            <Nav.Link href="/account">Account</Nav.Link>
          ) : (
            ''
          )}
        </Nav>

        <Navbar.Collapse className="justify-content-end">
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