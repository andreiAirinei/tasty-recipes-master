import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../redux/alert/alert.actions';

// Components
import ShareButtons from './ShareButtons';

// Bootstrap
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Footer = ({ setAlert }) => {

  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setEmail('');
    setAlert('Thank you for Subscribing to our newsletter!', 'success', 3500);
  }

  const handleChange = e => {
    setEmail(e.target.value);
  }

  return (
    <footer className='footer d-flex flex-column justify-content-between'>
      <Container fluid='xl'>
        <div className="subscribe d-flex flex-column justify-content-center text-center mt-5">
          <h4 className='font-weight-bold'>Be the first to hear about our latest recipes!</h4>
          <h5>Subscribe to our newsletter</h5>
          <form onSubmit={handleSubmit}>
            <InputGroup className="mt-3 mb-5 justify-content-center mx-auto">
              <input name='subscribe-email' value={email} onChange={handleChange} type="email" placeholder='Email' className='pl-2 mb-2 py-2' required />
              <InputGroup.Append>
                <Button type='submit' variant="outline-dark" className='mb-2' >Subscribe</Button>
              </InputGroup.Append>
            </InputGroup>
          </form>
        </div>
        <div className="footer-links d-flex flex-column flex-sm-row justify-content-around">
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><button className='border-0'>Professionals</button></li>
            <li className='my-3'><button className='border-0'>Communities</button></li>
            <li className='my-3'><button className='border-0'>Webinars</button></li>
          </ul>
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><button className='border-0'>Local Meetups</button></li>
            <li className='my-3'><button className='border-0'>Partners</button></li>
            <li className='my-3'><button className='border-0'>Stores</button></li>
          </ul>
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><button className='border-0'>Work with us</button></li>
            <li className='my-3'><button className='border-0'>Our Initiatives</button></li>
            <li className='my-3'><button className='border-0'>Giving Back</button></li>
          </ul>
        </div>
        <div className="text-center my-5">
          <ShareButtons size={30} shareURL='www.google.co.uk' />
        </div>
      </Container>
      <div className='text-center mb-2'>
        <p className='text-dark bg-light d-inline'>Copyright &copy; 2020 <a href='https://aandrei.dev' target='_blank' rel="noopener noreferrer" className='text-dark'>Andrei Airinei</a></p>
      </div>
    </footer>
  )
}

export default connect(null, { setAlert })(Footer);
