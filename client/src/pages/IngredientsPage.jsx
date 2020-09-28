import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// Redux
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../redux/ingredients/ingredients.actions';

// Components
import Jumbotron from '../components/Jumbotron/Jumbotron';
import IngredientsOverview from '../components/IngredientsOverview/IngredientsOverview';

// Bootstrap
import Container from 'react-bootstrap/Container';

const IngredientsPage = ({ fetchAllIngredients, ingredientsList }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    !ingredientsList && fetchAllIngredients();
    // eslint-disable-next-line
  }, [ingredientsList]);

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

const mapStateToProps = state => ({
  ingredientsList: state.ingredients.list
});

export default connect(mapStateToProps, { fetchAllIngredients })(IngredientsPage);
