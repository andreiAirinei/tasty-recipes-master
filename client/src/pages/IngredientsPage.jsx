import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../redux/ingredients/ingredients.actions';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import IngredientsOverview from '../components/IngredientsOverview/IngredientsOverview';
import CallToActionCard from '../components/CallToActionCard/CallToActionCard';

// Bootstrap
import Container from 'react-bootstrap/Container';

const IngredientsPage = ({ fetchAllIngredients }) => {
  useEffect(() => {
    fetchAllIngredients();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page-ingredients'>
      <Jumbotron imgURL='cooking3.jpg' title='Browse Ingredients' isLightBackground>
        <h6 className='text-white text-center hero-text mt-3'>
          Find recipes by your <span className='text-danger'>favorite</span> ingredient!
        </h6>
      </Jumbotron>
      <Container fluid='xl'>
        <IngredientsOverview />
      </Container>
    </div>
  )
}

export default connect(null, { fetchAllIngredients })(IngredientsPage);
