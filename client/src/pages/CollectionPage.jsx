import React from 'react';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import CollectionOverview from '../components/CollectionOverview/CollectionOverview';

// Bootstrap
import Container from 'react-bootstrap/Container';

const CollectionPage = () => {

  return (
    <>
      <div className='collection-page'>
        <div className="collection-hero">
          <Jumbotron imgURL='cooking1.jpg' title='Enjoy our delicious meals and desserts' />
        </div>
        <Container className='collection-navbar' fluid='xl'>
          <CollectionOverview />
        </Container>
      </div>
    </>
  )
}

export default CollectionPage;
