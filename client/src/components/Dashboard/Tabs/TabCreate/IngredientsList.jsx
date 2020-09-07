import React, { useEffect, useState } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../../../../redux/ingredients/ingredients.actions';
import {
  addIngredient,
  removeIngredient,
  clearIngredients
} from '../../../../redux/private/recipes/privateRecipes.actions';
import { selectIngredientsSearchList } from '../../../../redux/ingredients/ingredients.selectors';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const IngredientsList = ({
  list,
  fetchAllIngredients,
  ingredients,
  addIngredient,
  removeIngredient,
  clearIngredients
}) => {

  const [ingredient, setIngredient] = useState({
    name: '',
    quantity: ''
  })

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  const { quantity } = ingredient;

  // Dynamically set form field values
  const handleInputChange = e => {
    e !== null && setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value
    })
  };

  const handleAddIngredient = () => {
    // Check if ingredient is selected
    ingredient.name && addIngredient(ingredient);
  };

  const handleRemoveIngredient = id => {
    removeIngredient(id);
  }

  return (
    <div className='tab-create-section shadow'>
      {/* Ingredients */}
      <h4 className='text-center py-3 mb-3'>Ingredients</h4>
      <div className="d-flex">
        <div className="mr-5 w-100 pt-4">
          {/* Ingredient name */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="ingredient-name" className='width-120 text-size-09'>
                Ingredient
              </InputGroup.Text>
            </InputGroup.Prepend>
            {
              !list.length < 1 &&
              <Select
                name='name'
                options={list}
                placeholder='choose...'
                onChange={handleInputChange}
                isClearable
                className='form-control p-0 m-0 border-0'
              />
            }
          </InputGroup>

          {/* Ingredient Quantity */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="ingredient-quantity" className='width-120 text-size-09'>
                Qty/Measures
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
              placeholder="e.g. 3 tsp... (optional)"
              aria-label="ingredientQuantity"
              aria-describedby="ingredient-quantity"
            />
          </InputGroup>

          {/* Submit Ingredient */}
          <button onClick={handleAddIngredient} className='btn btn-dark outline-none text-size-08'>ADD INGREDIENT</button>
        </div>

        <div className="ingredients-table shadow-sm">
          <ul className='ingredients__list list-unstyled'>
            {
              ingredients.map(ing => (
                <li key={ing.id} className='text-dark shadow-sm'>
                  <div
                    className="d-flex flex-sm-column flex-md-row align-items-center py-1"
                  >
                    <div className="d-flex align-items-center">
                      <img src={`https://www.themealdb.com/images/ingredients/${ing.name}-Small.png`} className='mr-1' />
                      <p className='ingredient m-0 ml-1'><em>{ing.name}</em></p>
                    </div>
                    <p className='m-0'><strong>{ing.quantity}</strong></p>
                    <button onClick={() => handleRemoveIngredient(ing.id)} className='btn btn-link outline-none text-danger ml-auto'>&times;</button>
                  </div>
                </li>
              ))
            }
          </ul>
          {
            ingredients.length > 0 ? <Button onClick={clearIngredients} size='sm' variant='outline-secondary mx-auto d-block border-0'>CLEAR INGREDIENTS</Button>
              : <h6 className='text-center'><em>No ingredients selected!</em></h6>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  list: selectIngredientsSearchList(state),
  ingredients: state.privateRecipes.recipe.ingredients
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ing => dispatch(addIngredient(ing)),
  removeIngredient: id => dispatch(removeIngredient(id)),
  clearIngredients: () => dispatch(clearIngredients()),
  fetchAllIngredients: () => dispatch(fetchAllIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
