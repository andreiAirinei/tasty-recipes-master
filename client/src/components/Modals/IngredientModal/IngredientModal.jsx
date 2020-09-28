import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { closeModalIngredient } from '../../../redux/modals/ingredientModal/ingredientModal.actions';
import { getRecipesByIngredient } from '../../../redux/recipes/recipes.actions';

import MiniRecipesList from '../../MiniRecipesList/MiniRecipesList';

// Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../layout/LoadingSpinner';

const IngredientModal = ({ isActive, closeModalIngredient, ingredient, recipesByIngredient, getRecipesByIngredient }) => {

  useEffect(() => {
    ingredient && getRecipesByIngredient(ingredient);
    // eslint-disable-next-line
  }, [ingredient]);

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isActive}
      onHide={closeModalIngredient}
      className='ingredient-modal'
    >
      <Modal.Header closeButton className='border-0 pb-0' />
      <Modal.Body className='pt-0'>
        <div className="modal-image text-center mx-auto">
          <img src=
            {`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
            alt={''}
            className='ingredient-image'
          />
        </div>

        <h4 className='text-center mt-3 mb-5'>Recipes that include <span className='text-primary'>{ingredient}</span></h4>
        {
          recipesByIngredient.isLoading && <LoadingSpinner />
        }
        <MiniRecipesList
          recipes={recipesByIngredient}
        />
        {
          (recipesByIngredient.data === null || recipesByIngredient.data.length < 1) &&
          <p className='text-center'>No recipes found with this ingredient. {':('}</p>
        }
      </Modal.Body>
      <Modal.Footer className='border-0'>
        <Button onClick={() => closeModalIngredient()}
          className='btn-dark text-size-09'>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  isActive: state.ingredientModal.isActive,
  ingredient: state.ingredientModal.ingredient,
  recipesByIngredient: state.recipes.recipesByIngredient
});

const mapDispatchToProps = dispatch => ({
  getRecipesByIngredient: ingredient => dispatch(getRecipesByIngredient(ingredient)),
  closeModalIngredient: () => dispatch(closeModalIngredient())
})

export default connect(mapStateToProps, mapDispatchToProps)(IngredientModal);
