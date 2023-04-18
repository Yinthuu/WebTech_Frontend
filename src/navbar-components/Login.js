import { useState, useEffect  } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function LoginPage() {
const [username, setUsername] = useState('');
const [userId, setUserId] = useState('');
const [password, setPassword] = useState('');
const [loginFailed, setLoginFailed] = useState(false); // new state variable
const [isLoggedIn, setIsLoggedIn] = useState(false); 
const navigate = useNavigate();

const handleSubmit = async (event) => {
event.preventDefault();
// fetch all users from the backend
const response = await fetch('http://localhost:8081/users');
const users = await response.json();

// iterate over users and check if provided username and password match
const authenticatedUser = users.find((user) => {
    return user.username === username && bcrypt.compareSync(password, user.password);
  });
  
  if (authenticatedUser) {
    console.log(`User ${authenticatedUser.username} authenticated successfully`);
    sessionStorage.setItem('username', authenticatedUser.username);
    sessionStorage.setItem('userId', authenticatedUser._id);
    navigate('/');
  }  else {
    console.log('Invalid username or password');
    setLoginFailed(true); // set the loginFailed state to true
  }
};

useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

return (
<div className="container mt-5">
<div className="row justify-content-center">
<div className="col-md-6">
<h1 className="text-center mb-4">Login</h1>
<Form onSubmit={handleSubmit}>
<Form.Group controlId="username">
<Form.Label>Username</Form.Label>
<Form.Control
type="text"
placeholder="Enter username"
value={username}
onChange={(event) => setUsername(event.target.value)}
/>
</Form.Group>

<Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Login
        </Button>

        {loginFailed && ( // conditionally render the error message
          <Alert variant="danger" className="mt-3">
            Invalid username or password.
          </Alert>
        )}
      </Form>
    </div>
  </div>
</div>
);
}

export default LoginPage;
  