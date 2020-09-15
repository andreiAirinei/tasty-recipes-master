import React from 'react';

// Components
import ShareButtons from './ShareButtons';

// Bootstrap
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <footer className='footer d-flex flex-column justify-content-between'>
      <Container fluid='xl'>
        <div className="subscribe d-flex flex-column justify-content-center text-center mt-5">
          <h4 className='font-weight-bold'>Be the first to hear about our latest recipes!</h4>
          <h5>Subscribe to our newsletter</h5>
          <InputGroup className="mt-3 mb-5 justify-content-center mx-auto">
            <input type="mail" placeholder='Email' className='pl-2 mb-2 py-2' />
            <InputGroup.Append>
              <Button variant="outline-dark" className='mb-2' >Subscribe</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="footer-links d-flex flex-column flex-sm-row justify-content-around">
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><a href='#'>Professionals</a></li>
            <li className='my-3'><a href='#'>Communities</a></li>
            <li className='my-3'><a href='#'>Webinars</a></li>
          </ul>
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><a href='#'>Local Meetups</a></li>
            <li className='my-3'><a href='#'>Partners</a></li>
            <li className='my-3'><a href='#'>Stores</a></li>
          </ul>
          <ul className='list-unstyled font-weight-bold text-center'>
            <li className='my-3'><a href='#'>Work with us</a></li>
            <li className='my-3'><a href='#'>Our Initiatives</a></li>
            <li className='my-3'><a href='#'>Giving Back</a></li>
          </ul>
        </div>
        <div className="text-center my-5">
          <ShareButtons size={30} shareURL='www.google.co.uk' />
        </div>
      </Container>
      <div className='text-center mb-2'>
        <p className='text-dark bg-light d-inline'>Copyright &copy; 2020 <a href='https://aandrei.dev' target='_blank' className='text-dark'>Andrei Airinei</a></p>
      </div>
    </footer>
  )
}

export default Footer;
