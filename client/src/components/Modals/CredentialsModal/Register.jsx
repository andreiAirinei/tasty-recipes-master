import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { setTopicLogin } from '../../../redux/modals/credentialsModal/credentialsModal.actions';
import { register } from '../../../redux/auth/auth.actions';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = ({ setTopicLogin, register, error }) => {

  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
    password2: ''
  });

  const { email, username, password, password2 } = credentials;

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    register({
      email,
      username,
      password,
      password2
    });
  };

  return (
    <div className='credentials-modal--register'>
      <Form onSubmit={handleSubmit} className='mb-3'>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email *
            {
              error && error.map(err => (
                err.param === 'email' && <span className='text-size-08 text-red'><em>{err.msg}</em></span>
              ))

            }
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username *
            {
              error && error.map(err => (
                err.param === 'username' && <span className='text-size-08 text-red'><em>{err.msg}</em></span>
              ))
            }
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password *
            {
              error && error.map(err => (
                err.param === 'password' && <span className='text-size-08 text-red'><em>{err.msg}</em></span>
              ))
            }
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password *
            {
              error && error.map(err => (
                err.param === 'password2' && <span className='text-size-08 text-red'><em>{err.msg}</em></span>
              ))
            }
          </Form.Label>
          <Form.Control
            type="password"
            name="password2"
            value={password2}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="submit-button text-center">
          <Button className='bg-tasty' type="submit" block>
            Register
          </Button>
        </div>
      </Form>

      <div className='text-center'>
        or <button onClick={() => setTopicLogin(true)} className='btn btn-link p-0 m-0 text-danger pb-1'><u>Log In</u></button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
  setTopicLogin: topic => dispatch(setTopicLogin(topic)),
  register: formData => dispatch(register(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
