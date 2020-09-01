import React, { useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';
import { setRecipeFieldValue } from '../../../../redux/private/recipes/privateRecipes.actions';

// Selectors 
import {
  selectDishTypesSearchList,
  selectCountriesSearchList
} from '../../../../redux/category/category.selectors';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const BasicDetails = ({
  fetchCountries,
  fetchDishTypes,
  setRecipeFieldValue,
  recipe,
  dishTypes,
  countries
}) => {

  useEffect(() => {
    fetchDishTypes();
    fetchCountries();
  }, []);

  const { name, area, category, youtubeURL } = recipe;

  // Dynamically set form field values
  const handleInputChange = e => {
    setRecipeFieldValue({
      value: e.target.value,
      fieldName: e.target.name
    });
  }

  // Re-establishing inputs of REACT-SELECT components 
  const categoryIdx = category && dishTypes.map(el => el.value).indexOf(category);
  const areaIdx = area && countries.map(el => el.value).indexOf(area);

  return (
    <>
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
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe,
  dishTypes: selectDishTypesSearchList(state),
  countries: selectCountriesSearchList(state)
})

const mapDispatchToProps = dispatch => ({
  setRecipeFieldValue: fieldVal => dispatch(setRecipeFieldValue(fieldVal)),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  fetchCountries: () => dispatch(fetchCountries()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
