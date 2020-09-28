import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import DashboardDirectory from '../components/Dashboard/DashboardDirectory';

const DashboardPage = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
      <DashboardDirectory />
    </div>
  )
}

export default DashboardPage;
