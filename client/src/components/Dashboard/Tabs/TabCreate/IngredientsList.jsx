import React, { useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { fetchAllIngredients } from '../../../../redux/ingredients/ingredients.actions';
import { setRecipeFieldValue } from '../../../../redux/private/recipes/privateRecipes.actions';
import { selectIngredientsSearchList } from '../../../../redux/ingredients/ingredients.selectors';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';

const IngredientsList = ({ list, fetchAllIngredients }) => {

  useEffect(() => {
    fetchAllIngredients();
  }, []);

  // Dynamically set form field values
  const handleInputChange = e => {
    setRecipeFieldValue({
      value: e.target.value,
      fieldName: e.target.name
    });
  }

  return (
    <>
      {/* Ingredients */}
      <h4 className='bg-light text-center py-1 mt-5 mb-3'>Ingredients</h4>

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
              !ingredientsList.length < 1 &&
              <Select
                name='ingredient'
                options={ingredientsList}
                placeholder='choose...'
                onChange={handleInputChange}
                // defaultValue={ingredientsList[areaIdx]}
                className='form-control p-0 m-0 border-0'
              />
            }
          </InputGroup>

          {/* Ingredient Quantity */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="ingredient-quantity" className='width-120 text-size-09'>
                Quantity
      </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
              placeholder="e.g. 3 tsp..."
              aria-label="ingredientQuantity"
              aria-describedby="ingredient-quantity"
            />
          </InputGroup>

          {/* Submit Ingredient */}
          <button onClick={handleAddIngredient} className='btn btn-dark outline-none text-size-08'>ADD INGREDIENT</button>
        </div>

        <div className="ingredients-table">
          <ul className='ingredients__list list-unstyled shadow-sm'>
            {
              ingredientsCollection.map((ing, idx) => (
                <li key={idx} className='text-dark shadow-sm'>
                  <div
                    className="d-flex flex-sm-column flex-md-row align-items-center py-1"
                  >
                    <div className="d-flex align-items-center">
                      <img src={`https://www.themealdb.com/images/ingredients/${ing.name}-Small.png`} className='mr-1' />
                      <p className='ingredient m-0 ml-1'><em>{ing.name}</em></p>
                    </div>
                    <p className='m-0'><strong>{ing.qty}</strong></p>
                    <button onClick={() => handleRemoveIngredient(ing.name)} className='btn btn-link outline-none text-danger ml-auto'>&times;</button>
                  </div>
                </li>
              ))
            }
          </ul>
          <h6 className='text-center'><em>No ingredients selected!</em></h6>
          <Button size='sm' variant='outline-secondary mx-auto d-block border-0'>CLEAR INGREDIENTS</Button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  list: selectIngredientsSearchList(state)
});

const mapDispatchToProps = dispatch => ({
  fetchAllIngredients: () => dispatch(fetchAllIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsList);
