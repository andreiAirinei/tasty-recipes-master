import React from 'react';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import CallToActionCard from '../components/CallToActionCard/CallToActionCard';
import CollectionOverview from '../components/CollectionOverview/CollectionOverview';

// Bootstrap
import Container from 'react-bootstrap/Container';

const CollectionPage = () => {

  return (
    <>
      <div className='collection-page'>
        <div className="collection-hero">
          <Jumbotron imgURL='cooking1.jpg' title='Enjoy our delicious meals and desserts' />
          <CallToActionCard />
        </div>
        <Container className='collection-navbar' fluid='xl'>
          <CollectionOverview />
        </Container>
      </div>
      {/* <div className="white-space"></div> */}
    </>
  )
}

export default CollectionPage;
