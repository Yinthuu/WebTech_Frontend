import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function AccountEdit() {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCustomer(prevCustomer => ({...prevCustomer, [name]: value}));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const requestBody = {
      email: customer.email,
      password: customer.password,
      username: customer.username,
      address: customer.address,
      city:customer.city,
      state: customer.state,
      country: customer.country
    };
    console.log("requestBody: "+requestBody);
    fetch(`http://localhost:8081/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(res => {
      if (res.ok) {
        setIsEditing(false);
        console.log('successfully updated'+ `${userId}`);
        navigate(`/account/view/${userId}`);
      } else {
        console.log('Error updating customer');
      }
    })
    .catch(err => console.log(err));
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" name="username" value={customer.username} onChange={handleInputChange} disabled={isEditing} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" name="email" value={customer.email} onChange={handleInputChange} disabled={isEditing} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" name="address" value={customer.address} onChange={handleInputChange} disabled={isEditing} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" name="city" value={customer.city} onChange={handleInputChange} disabled={isEditing} />
          </Form.Group>


        <Form.Group className="mb-3" controlId="formBasicState">
          <Form.Label>State</Form.Label>
          <Form.Select aria-label="State" name="state" value={customer.state} onChange={handleInputChange} disabled={isEditing}>
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

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Country</Form.Label>
        <Form.Control type="text" placeholder="Enter Country" name="country"  value={customer.country} onChange={handleInputChange} disabled={isEditing} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={customer.password} onChange={handleInputChange} disabled={isEditing} />
      </Form.Group>

      <div className="d-flex justify-content-between">
        {isEditing ? (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>         
        ) : (
          <Button variant="primary" type="submit">
            Save
          </Button>
        )}
        <Link to={`/account/view/${userId}`}>
          <Button variant="secondary">
            Cancel
          </Button>
        </Link>
      </div>
    </Form>
  )}
</Container>
);
}

export default AccountEdit;
