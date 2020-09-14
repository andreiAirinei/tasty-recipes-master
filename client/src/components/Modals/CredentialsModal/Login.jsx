import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { login } from '../../../redux/auth/auth.actions';
import { setTopicLogin } from '../../../redux/modals/credentialsModal/credentialsModal.actions';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = ({ setTopicLogin, login }) => {

  const [credentials, setCredentials] = useState({
    email: 'test@test.com',
    password: 'test123'
  });

  const { email, password } = credentials;

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  return (
    <div className='credentials-modal--login'>
      <Form onSubmit={handleSubmit} className='mb-3'>
        <Form.Group controlId="formBasicEmail">
          <Form.Control name="email" type="email" placeholder="Email" onChange={handleChange} value={email} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control name="password" type="password" placeholder="Password" onChange={handleChange} value={password} required />
        </Form.Group>

        <div className="submit-button text-center">
          <Button className='bg-tasty' type="submit" block>
            Log In
          </Button>
        </div>
      </Form>

      <div className='text-center my-4'>
        New to Tasty Recipes? <button onClick={() => setTopicLogin(false)} className='btn btn-link p-0 m-0 text-danger pb-1'><u>Create an account</u></button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setTopicLogin: topic => dispatch(setTopicLogin(topic)),
  login: formData => dispatch(login(formData))
});

export default connect(null, mapDispatchToProps)(Login);
