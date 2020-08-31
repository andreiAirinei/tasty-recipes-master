import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { createRecipe } from '../../../../redux/private/recipes/privateRecipes.actions';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';
import { fetchAllIngredients } from '../../../../redux/ingredients/ingredients.actions';

// Reselect
import { createStructuredSelector } from 'reselect';
import { selectDishTypesSearchList, selectCountriesSearchList } from '../../../../redux/category/category.selectors';
import { selectIngredientsSearchList } from '../../../../redux/ingredients/ingredients.selectors';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TabCreate = ({
  createRecipe,
  fetchDishTypes,
  fetchCountries,
  fetchAllIngredients,
  dishTypes,
  countries,
  ingredientsList
}) => {

  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    ingredient: '',
    quantity: '',
    ingredientsCollection: [{
      name: 'Avocado',
      qty: 'half'
    }, {
      name: 'Salmon',
      qty: '3 filetts'
    }, {
      name: 'Avocado',
      qty: 'half'
    }, {
      name: 'Salmon',
      qty: '3 filetts'
    }]
  });

  const { name, category, area, youtubeURL, ingredient, quantity, ingredientsCollection } = recipe;

  useEffect(() => {
    fetchDishTypes();
    fetchCountries();
    fetchAllIngredients();
  }, []);

  // const index = dishTypes.map(el => el.value).indexOf(category);

  const handleInputChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  };

  // Add ingredient at the start of the array
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredientsCollection: [{
        name: ingredient,
        qty: quantity
      }, ...ingredientsCollection]
    })
  };

  const handleRemoveIngredient = () => {
    // setRecipe({
    //   ...recipe,
    //   ingredientsCollection: 
    // })
  }

  const handleSubmit = e => {
    e.preventDefault();
    createRecipe(recipe);
  };

  // Re-establishing inputs of REACT-SELECT components 
  // Does not iterate if states are empty strings
  const categoryIdx = category && dishTypes.map(el => el.value).indexOf(category);
  const areaIdx = area && countries.map(el => el.value).indexOf(area);

  return (
    <div className='tab-create'>
      <h1>Create new recipe</h1>
      <hr />
      <h4 className='bg-light text-center py-1 mt-4 mb-4'>Details</h4>
      <div className="d-flex flex-column flex-lg-row">
        {/* Recipe name */}
        <InputGroup className="mb-3 mr-5">
          <InputGroup.Prepend>
            <InputGroup.Text id="recipe--name" className='width-120 text-size-09'>
              Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="name"
            value={name}
            onChange={handleInputChange}
            aria-label="Name"
            aria-describedby="recipe-name"
          />
        </InputGroup>

        {/* Country */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text className='width-120 text-size-09'>
              Area
            </InputGroup.Text>
          </InputGroup.Prepend>
          {
            !countries.length < 1 &&
            <Select
              name='area'
              options={countries}
              placeholder='choose...'
              onChange={handleInputChange}
              defaultValue={countries[areaIdx]}
              className='border-0 form-control p-0 m-0'
            />
          }
        </InputGroup>
      </div>

      <div className="d-flex flex-column flex-lg-row">
        {/* Category */}
        <InputGroup className="mb-3 mr-5">
          <InputGroup.Prepend>
            <InputGroup.Text className='width-120 text-size-09'>
              Category
            </InputGroup.Text>
          </InputGroup.Prepend>
          {
            !dishTypes.length < 1 &&
            <Select
              name='category'
              options={dishTypes}
              placeholder='choose...'
              onChange={handleInputChange}
              defaultValue={dishTypes[categoryIdx]}
              className='form-control p-0 m-0 border-0'
            />
          }
        </InputGroup>

        {/* YoutubeURL */}
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="youtube-url" className='width-120 text-size-09'>
              Youtube URL
          </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="youtubeURL"
            value={youtubeURL}
            placeholder="full link here... (not required)"
            onChange={handleInputChange}
            aria-label="youtubeURL"
            aria-describedby="youtube-url"
          />
        </InputGroup>
        {/* <p className="blockquote-footer"><em>not required</em></p> */}
      </div>

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
          <button onClick={handleAddIngredient} className='btn btn-dark outline-none text-size-08'>Add ingredient</button>
        </div>

        <ul className='ingredients__list list-unstyled'>
          {
            ingredientsCollection.map((ing, idx) => (
              <li key={idx} className='text-dark bg-white'>
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
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dishTypes: selectDishTypesSearchList,
  countries: selectCountriesSearchList,
  ingredientsList: selectIngredientsSearchList
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchAllIngredients: () => dispatch(fetchAllIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(TabCreate);
