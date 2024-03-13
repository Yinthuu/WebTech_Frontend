import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";

function AccountCreate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [purchase_history, setPurchase_history] = useState('1');

  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const response = await fetch('http://localhost:8081/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //       purchase_history,
  //       address,
  //       city,
  //       state,
  //       country,
  //     }),
  //   });

  //   const data = await response.json();
  //   const userId = data.id;

  //   navigate(`/account/view/${userId}`);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8081/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username: name,
          purchase_history,
          address,
          city,
          state,
          country,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const userId = data.id;
        console.log(`Created user with ID ${userId}`);
        navigate(`/account/view/${userId}`);
      } else {
        console.error(`Failed to create account: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };
  

  return (
    <Container>
      <br></br>
      <h3>Create Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="tex" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>City</Form.Label>
          <Form.Control type="tex" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>State</Form.Label>
      <Form.Select aria-label="Default select example" value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">--Select---</option>
        <option value="Alberta">Alberta</option>
        <option value="British Columbia">British Columbia</option>
        <option value="Manitoba">Manitoba</option>
        <option value="New Brunswick">New Brunswick</option>
        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
        <option value="Nova Scotia">Nova Scotia</option>
        <option value="Ontario">Ontario</option>
        <option value="Prince Edward Island">Prince Edward Island</option>
        <option value="Quebec">Quebec</option>
        <option value="Saskatchewan">Saskatchewan</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCountry">
      <Form.Label>Country</Form.Label>
      <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </Form.Group>

    <Button variant="primary" type="submit">
      Create
    </Button>
  </Form>
</Container>
);
}

export default AccountCreate;
