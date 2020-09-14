import React from 'react';

// Components
import ContactForm from '../components/ContactForm/ContactForm';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ContactPage = () => {
  return (
    <div className='contact-page'>
      <Container fluid='xl'>
        <Row>
          <Col xs={12} md={6} className='p-xl-0'>
            <div className='d-flex align-items-center h-100'>
              <div>
                <h2 className='text-dark'>Have any questions?</h2>
                <h1 className='text-dark'>We'd love to hear from you</h1>
                <p className='mt-5'>Credibly administrate market positioning deliverables rather than clicks-and-mortar methodologies. Proactively formulate out-of-the-box technology with clicks-and-mortar testing procedures. Uniquely promote leveraged web-readiness for standards compliant value.</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ContactPage;
