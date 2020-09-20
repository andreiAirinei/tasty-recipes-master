import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  fetchUserRecipes, removeRecipeById, editRecipeById
} from '../../../../redux/private/recipes/privateRecipes.actions';
import RecipesItem from './RecipesItem';

// Components
import SectionTitle from '../../../layout/SectionTitle';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecipesContainer = ({ history, fetchUserRecipes, removeRecipeById, editRecipeById, recipes }) => {

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const handleDeleteRecipe = (e, id) => {
    e.preventDefault();
    removeRecipeById(id);
  }

  const handleEditRecipe = (e, id) => {
    e.preventDefault();
    editRecipeById(id);
    history.push(`/dashboard/edit/${id}`);
  }

  return (
    <div className='recipes-container mb-5'>
      <SectionTitle title='My Recipes' />
      {
        recipes.length < 1 && <h6><em>You don't have any recipes created. <Link to='/dashboard/create' className='text-danger'><u>Go and make one!</u></Link></em></h6>
      }
      <Row>
        {
          !recipes.length < 1 && recipes.map(recipe => (
            <Col xs={12} sm={6} lg={3} key={recipe._id} >
              <RecipesItem
                recipe={recipe}
                handleDeleteRecipe={handleDeleteRecipe}
                handleEditRecipe={handleEditRecipe}
              />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  recipes: state.privateRecipes.recipes
});

const mapDispatchToProps = dispatch => ({
  fetchUserRecipes: () => dispatch(fetchUserRecipes()),
  removeRecipeById: id => dispatch(removeRecipeById(id)),
  editRecipeById: id => dispatch(editRecipeById(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipesContainer));
