import React, { useState, useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { createRecipe } from '../../../../redux/private/recipes/privateRecipes.actions';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';

// Reselect
import { createStructuredSelector } from 'reselect';
import { selectDishTypesSearchList, selectCountriesSearchList } from '../../../../redux/category/category.selectors';
import { selectIngredientsSearchList } from '../../../../redux/ingredients/ingredients.selectors';

// Components
import BasicDetails from './BasicDetails';
import IngredientsList from './IngredientsList';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const TabCreate = ({
  createRecipe
}) => {

  const [recipe, setRecipe] = useState({
    ingredient: '',
    quantity: '',
    ingredientsCollection: [{
      name: 'Avocado',
      qty: 'half'
    }, {
      name: 'Salmon',
      qty: '3 filetts'
    }, {
      name: 'Bay Leaf',
      qty: '2'
    }, {
      name: 'Cajun',
      qty: '100g'
    }],
    step: '',
    steps: []
  });

  const { ingredient, quantity, ingredientsCollection, step, steps } = recipe;

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

  const handleRemoveIngredient = ingredient => {
    setRecipe({
      ...recipe,
      ingredientsCollection: ingredientsCollection.filter(el => el.name !== ingredient)
    })
  }

  const handleAddStep = () => {
    setRecipe({
      ...recipe,
      steps: [...steps, { text: step }],
      step: ''
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    createRecipe(recipe);
  };

  return (
    <div className='tab-create'>
      <h1>Create new recipe</h1>
      <hr />

      <BasicDetails />
      <IngredientsList />


      {/* How to make it */}
      <h4 className='bg-light text-center py-1 mt-5 mb-3'>How to make it</h4>

      {
        steps.map((step) => (
          <Card className='my-5 shadow-sm'>
            <Card.Header as="h6">Step X</Card.Header>
            <Card.Body>
              <Card.Text>
                {step.text}
              </Card.Text>
              <div className="step-buttons">
                <Button size='sm' variant="success" className='mr-3'>EDIT</Button>
                <Button size='sm' variant="secondary">REMOVE</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      }

      <InputGroup className='recipe-steps flex-column border-none'>
        <InputGroup.Prepend className='w-100 d-block'>
          <InputGroup.Text></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as="textarea" name="step" aria-label="Step" value={recipe.step} onChange={handleInputChange} placeholder='Write here each of the cooking process...' />
      </InputGroup>

      <button onClick={handleAddStep} className='btn btn-dark outline-none text-size-08 mx-auto d-block my-3'>ADD STEP</button>

      <hr />
      <div className="text-center">
        <Button size='lg' variant='success mr-3'>SAVE RECIPE</Button>
        <Button size='lg' variant='outline-secondary'>RESET FIELDS</Button>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dishTypes: selectDishTypesSearchList,
  countries: selectCountriesSearchList,
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabCreate);
