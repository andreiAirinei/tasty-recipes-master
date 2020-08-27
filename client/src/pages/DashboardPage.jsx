import React from 'react';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import DashboardDirectory from '../components/Dashboard/DashboardDirectory';

// Bootstrap
import Container from 'react-bootstrap/Container';

const DashboardPage = () => {
  return (
    <div className='dashboard-page'>
      <Jumbotron imgURL='woman-cooking.jpg' title='Dashboard' isLightBackground >
        <h6 className='text-white text-center hero-text mt-3 d-sm-none'>
          Here is where you can
        </h6>
        <h6 className='text-white text-center hero-text mt-3 d-none d-sm-block'>
          Here is where you can {' '}
          <span className='text-success'>create</span>, {' '}
          <span className='text-success'>store</span> &amp; {' '}
          <span className='text-success'>share</span>
        </h6>
        <h6 className='text-white text-center hero-text d-sm-none'>
          <span className='text-success'>create</span>, {' '}
          <span className='text-success'>store</span> &amp; {' '}
          <span className='text-success'>share</span></h6>
        <h6 className='text-white text-center hero-text'>your most beloved recipes!</h6>
      </Jumbotron>
      <Container fluid='xl'>
        <DashboardDirectory />
      </Container>
      <div className="white-space"></div>
    </div>
  )
}

export default DashboardPage;
