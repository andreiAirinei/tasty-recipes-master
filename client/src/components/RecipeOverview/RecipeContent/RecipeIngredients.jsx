import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import {
  setModalIngredient,
  modalOpenIngredient
} from '../../../redux/modals/ingredientModal/ingredientModal.actions';

// Selectors
import { selectSingleRecipe } from '../../../redux/recipes/recipes.selectors';

// Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const RecipeIngredients = ({ singleRecipe, setModalIngredient, modalOpenIngredient }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (singleRecipe) setState(handleIngredients(singleRecipe));
  }, [singleRecipe]);

  const handleIngredientClick = (ingredient) => {
    setModalIngredient(ingredient);
    modalOpenIngredient();
  }

  // Function is returning an array of objects with 'id', ingredient' and 'quantity' properties
  // Reason of this function is because of poorly structured API from TheMealDB.com
  const handleIngredients = (recipe) => {
    const ingredientsList = [];
    let totalIngredients = 0;
    let listIndex = 0;

    // Loop through each key - value pairs of the object received
    for (let [key, value] of Object.entries(recipe)) {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        ingredientsList.push({
          id: totalIngredients,
          ingredient: value,
          quantity: null,
          image: `https://www.themealdb.com/images/ingredients/${value}-Small.png`
        });
        totalIngredients++;
      }

      // At this point we already know that we have looped through all ingredients 
      // thus having set the totalIngredients
      if (key.includes('strMeasure') && (listIndex < totalIngredients) && value !== '' && value !== null) {
        ingredientsList[listIndex].quantity = value;
        listIndex++;
      }
    }
    return ingredientsList;
  }

  return (
    <div className="recipe-ingredients ml-sm-5 mb-5">
      <h2 className='ingredients-title mb-4 text-center text-sm-left'>Ingredients</h2>
      <ul className="ingredients-list list-unstyled">
        {state &&
          state.map(item => (
            <li key={item.id}>
              <div
                onClick={() => handleIngredientClick(item.ingredient)}
                className="ingredients-list-item d-flex flex-sm-column flex-md-row align-items-center py-1"
              >
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.ingredient} className='mr-1' />
                  <p className='ingredient m-0 ml-1'><em>{item.ingredient}</em></p>
                </div>
                <p className='m-0'><strong>{item.quantity}</strong></p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = state => ({
  singleRecipe: selectSingleRecipe(state)
});

const mapDispatchToProps = dispatch => ({
  modalOpenIngredient: () => dispatch(modalOpenIngredient()),
  setModalIngredient: ingredient => dispatch(setModalIngredient(ingredient))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeIngredients);
