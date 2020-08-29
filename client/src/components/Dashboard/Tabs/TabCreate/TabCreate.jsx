import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createRecipe } from '../../../../redux/private/recipes/privateRecipes.actions';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';
import { selectDishTypesSearchList, selectCountriesSearchList } from '../../../../redux/category/category.selectors';

const TabCreate = ({
  createRecipe,
  fetchDishTypes,
  fetchCountries,
  dishTypes,
  countries
}) => {

  const [recipe, setRecipe] = useState({
    name: '',
    category: '',
    area: '',
    youtubeURL: '',
    ingredients: []
  });

  const { name, category, area, youtubeURL } = recipe;

  useEffect(() => {
    fetchDishTypes();
    fetchCountries();
  }, []);

  // const index = dishTypes.map(el => el.value).indexOf(category);

  const handleInputChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    })
  };

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

      {/* Recipe name */}
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="recipe-name">
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

      {/* Category */}
      {
        !dishTypes.length < 1 &&
        <Select
          name='category'
          options={dishTypes}
          placeholder='Category'
          onChange={handleInputChange}
          defaultValue={dishTypes[categoryIdx]}
          className='mb-3'
        />
      }

      {/* Country */}
      {
        !countries.length < 1 &&
        <Select
          name='area'
          options={countries}
          placeholder='Area'
          onChange={handleInputChange}
          defaultValue={countries[areaIdx]}
          className='mb-3'
        />
      }

      {/* YoutubeURL */}
      <InputGroup className="mb-5">
        <InputGroup.Prepend>
          <InputGroup.Text id="youtube-url">
            Youtube URL
            </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          name="youtubeURL"
          value={youtubeURL}
          onChange={handleInputChange}
          aria-label="youtubeURL"
          aria-describedby="youtube-url"
        />
      </InputGroup>

      {/* Ingredients */}
      <h5 className='bg-light'>Ingredients</h5>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dishTypes: selectDishTypesSearchList,
  countries: selectCountriesSearchList
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  fetchCountries: () => dispatch(fetchCountries())
});

export default connect(mapStateToProps, mapDispatchToProps)(TabCreate);
