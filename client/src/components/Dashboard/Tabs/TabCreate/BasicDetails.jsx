import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';
import { setBasicFieldValue } from '../../../../redux/private/recipes/privateRecipes.actions';

// Selectors 
import {
  selectDishTypes,
  selectCountriesList
} from '../../../../redux/category/category.selectors';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import RecipeImage from './RecipeImage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BasicDetails = ({
  fetchCountries,
  fetchDishTypes,
  setBasicFieldValue,
  recipe,
  dishTypes,
  countries
}) => {
  const { name, area, category, youtubeURL } = recipe;

  useEffect(() => {
    fetchDishTypes();
    fetchCountries();
  }, []);

  // Dynamically set form field values
  const handleInputChange = e => {
    setBasicFieldValue({
      value: e.target.value,
      fieldName: e.target.name
    });
  }

  return (
    <section className='tab-create-section shadow'>
      <h4 className='text-center py-3 mb-3'>Details</h4>
      <Row>
        <Col xs={12} lg={6}>
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

          {/* Cuisine */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="recipe--name" className='width-120 text-size-09'>
                Cuisine
            </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="select" name="area" value={area} onChange={handleInputChange}>
              <option value=''>choose...</option>
              {
                !countries.length < 1 && countries.map((country, idx) => (
                  <option key={idx} value={country.strArea}>{country.strArea}</option>
                ))
              }
            </FormControl>
          </InputGroup>

          {/* Category */}
          <InputGroup className="mb-3 mr-5">
            <InputGroup.Prepend>
              <InputGroup.Text className='width-120 text-size-09'>
                Category
            </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" name="category" value={category} onChange={handleInputChange}>
              <option value=''>choose...</option>
              {
                !dishTypes.length < 1 && dishTypes.map((dish, idx) => (
                  <option key={idx} value={dish.strCategory}>{dish.strCategory}</option>
                ))
              }
            </Form.Control>
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
        </Col>
        <Col xs={12} lg={6}>
          <RecipeImage />
        </Col>
      </Row>

    </section>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe,
  dishTypes: selectDishTypes(state),
  countries: selectCountriesList(state),
})

const mapDispatchToProps = dispatch => ({
  setBasicFieldValue: fieldVal => dispatch(setBasicFieldValue(fieldVal)),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  fetchCountries: () => dispatch(fetchCountries())
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
