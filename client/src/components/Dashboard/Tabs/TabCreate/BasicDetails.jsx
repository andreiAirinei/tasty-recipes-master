import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Redux
import { connect } from 'react-redux';
import { fetchDishTypes, fetchCountries } from '../../../../redux/category/category.actions';
import { setBasicFieldValue } from '../../../../redux/private/recipes/privateRecipes.actions';

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
  setBasicFieldValue,
  recipe,
  dishTypes,
  countries
}) => {
  const { name, area, category, youtubeURL } = recipe;

  const [state, setState] = useState({
    inputValue: '',
    value: ''
  })

  const handleSelectorChange = (input, { action }) => {
    switch (action) {
      case 'select-option':
        console.log(action, input);
        setBasicFieldValue({
          value: input.target.value,
          fieldName: input.target.name
        });
        return;

      case 'clear':

        return;

      case 'remove-value':
      case 'deselect-option':
      case 'pop-value':
      case 'create-option':
      case 'set-value':
      case 'create-option':
        console.log('-------------->>>  ', action);
        return;

      default:
        return;
    }
  }

  const onInputChange = (inputValue, { action }) => {
    console.log('onInputChange --->', inputValue, action);
    switch (action) {
      case 'input-change':
        setState({ inputValue });
        return;

      case 'set-value':
        console.log('Set value ---', inputValue);
        return;

      case 'menu-close':
        console.log(state.inputValue);
        let menuIsOpen = undefined;
        if (state.inputValue) {
          menuIsOpen = true;
        }
        setState({
          menuIsOpen
        });
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    fetchDishTypes();
    fetchCountries();
    console.log('updated');
  }, []);

  // Dynamically set form field values
  const handleInputChange = e => {
    console.log(e);
    e && setBasicFieldValue({
      value: e.target.value,
      fieldName: e.target.name
    });
  }

  // Re-establishing inputs of REACT-SELECT components 
  const categoryIdx = category ? dishTypes.map(el => el.value).indexOf(category) : '';
  const areaIdx = area ? countries.map(el => el.value).indexOf(area) : '';

  return (
    <section className='tab-create-section shadow'>
      <h4 className='text-center py-3 mb-3'>Details</h4>
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
              Cuisine
            </InputGroup.Text>
          </InputGroup.Prepend>
          {
            !countries.length < 1 &&
            <Select
              name='area'
              options={countries}
              placeholder='choose...'
              isClearable={true}
              isSearchable={true}
              onChange={handleSelectorChange}
              inputValue={area}
              onInputChange={onInputChange}
              // defaultInputValue={areaIdx && countries[areaIdx]}
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
              defaultInputValue={categoryIdx ? dishTypes[categoryIdx] : ''}
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
    </section>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe,
  dishTypes: selectDishTypesSearchList(state),
  countries: selectCountriesSearchList(state)
})

const mapDispatchToProps = dispatch => ({
  setBasicFieldValue: fieldVal => dispatch(setBasicFieldValue(fieldVal)),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  fetchCountries: () => dispatch(fetchCountries())
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetails);
