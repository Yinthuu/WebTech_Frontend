import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function AccountPage() {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:8081/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  function findCustomerById(customers, id) {
    return customers.find((element) => {
      return element._id === id;
    })
  }

  return (
    <Container>
      <br />

      <div>
        <Link to={`/account/create`}>
          <Button variant="primary" type="submit" style={{float: 'right'}}>
            <FaPlus/> Create an account
          </Button>
        </Link>
      </div>

      <br />

      <h3>View Account Details</h3>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={customer.username} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" value={customer.email} disabled />
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="number" placeholder="Enter Mobile Number" value={customer.mobile} disabled />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={customer.address} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" value={customer.city} disabled />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter State" value={customer.state} disabled />
          </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Enter Country" value={customer.country} disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={customer.password}  placeholder="Password" disabled/>
      </Form.Group>

      <Link to={`/account/edit/${userId}`}>
        <Button variant="primary" type="submit">
          Edit
        </Button>
      </Link>
    </Form>
  )}
</Container>
);
}


export default AccountPage;