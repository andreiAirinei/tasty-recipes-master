import React from 'react';

// Redux & Selectors
import { connect } from 'react-redux';
import { selectLatestRecipes } from '../../../redux/recipes/recipes.selectors';

// Components 
import RecipeInstructions from './RecipeInstructions';
import RecipeIngredients from './RecipeIngredients';
import MiniRecipesList from '../../MiniRecipesList/MiniRecipesList';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecipeContent = ({ latestRecipes }) => {

  return (
    <div className='recipe-content mb-5 mb-md-2'>
      <Row>
        <Col sm={{ order: 2, span: 5 }} lg={5}>
          <RecipeIngredients />
          <MiniRecipesList recipes={latestRecipes} title='Latest' otherClasses='ml-sm-5 mb-5 d-none d-sm-block' />
        </Col>
        <Col sm={{ order: 1, span: 7 }} lg={7} >
          <RecipeInstructions />
        </Col>
      </Row>
      <MiniRecipesList recipes={latestRecipes} title='Latest' otherClasses='d-block d-sm-none' />
    </div>
  )
}

const mapStateToProps = state => ({
  latestRecipes: selectLatestRecipes(state)
})

export default connect(mapStateToProps)(RecipeContent);
