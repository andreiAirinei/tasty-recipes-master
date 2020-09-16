import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alert.actions';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ContactForm = ({ setAlert }) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = inputs;

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setInputs({
      name: '',
      email: '',
      message: ''
    });
    setAlert('Message successfully sent. Thank you!', 'success');
  };

  return (
    <Form onSubmit={handleSubmit} className='contact-form mb-3 px-4 py-5 shadow'>
      <Form.Group controlId="nameFormTasty">
        <Form.Label className='text-dark'>Name</Form.Label>
        <Form.Control name="name" type="text" onChange={handleChange} value={name} required />
      </Form.Group>

      <Form.Group controlId="emailFormTasty">
        <Form.Label className='text-dark'>Email</Form.Label>
        <Form.Control name="email" type="email" onChange={handleChange} value={email} required />
      </Form.Group>

      <Form.Group controlId="messageFormTasty">
        <Form.Label className='text-dark'>Message</Form.Label>
        <Form.Control name='message' onChange={handleChange} value={message} as="textarea" rows="5" required />
      </Form.Group>

      <div className="submit-button">
        <Button variant='primary' type="submit">SEND</Button>
      </div>
    </Form>
  )
}

export default connect(null, { setAlert })(ContactForm);

