import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  createRecipe,
  updateRecipe,
  populateFieldsFromLS,
  resetAllFields,
  toggleEditMode,
  setActionSuccessfulToFalse
} from '../../../../redux/private/recipes/privateRecipes.actions';
import { setAlert } from '../../../../redux/alert/alert.actions';

// Components
import SectionTitle from '../../../layout/SectionTitle';
import BasicDetails from './BasicDetails';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const TabCreate = ({ createRecipe, updateRecipe, populateFieldsFromLS, resetAllFields, editMode, toggleEditMode, recipe, setAlert, actionSuccessful, imgbbLoading, setActionSuccessfulToFalse, history }) => {

  const { ingredients, steps } = recipe;

  useEffect(() => {
    !editMode && populateFieldsFromLS();
    if (actionSuccessful) {
      history.push('/dashboard/my-recipes');
      setActionSuccessfulToFalse();
    }

    return () => {
      toggleEditMode(false);
    }
  }, [editMode, toggleEditMode, populateFieldsFromLS, actionSuccessful]);


  const handleResetButton = () => {
    resetAllFields();
    window.scrollTo(0, 400);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!ingredients.length > 0) {
      setAlert('Atleast 1 ingredient needed', 'fail');
      window.scrollTo(0, 1012);
      return;
    };
    if (!steps.length > 0) {
      setAlert('Atleast 1 cooking step needed', 'fail');
      window.scrollTo(0, 1400);
      return;
    };
    !editMode ? createRecipe(recipe) : updateRecipe(recipe);
  };

  return (
    <div className={`tab-create ${editMode && 'theme-edit'}`}>

      <SectionTitle title={!editMode ? 'Create new recipe' : 'Edit Recipe'} />
      <Form onSubmit={handleSubmit}>
        <BasicDetails />
        <IngredientsList />
        <Instructions />
        {
          !editMode ?
            <div className="text-center">
              <Button type='submit' variant='success' className='create-form-button mr-3' disabled={imgbbLoading}>
                {
                  imgbbLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> Processing image...
                  </>
                  ) : 'SAVE RECIPE'
                }
              </Button>
              <Button onClick={handleResetButton} variant='outline-secondary' className='create-form-button'>RESET FIELDS</Button>
            </div>
            : <div className="text-center">
              <Button type='submit' variant='success' className='create-form-button mr-3' disabled={imgbbLoading}>
                {
                  imgbbLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      /> Processing image...
                  </>
                  ) : 'UPDATE RECIPE'
                }
              </Button>
              <Button onClick={() => window.history.back()} variant='outline-dark' className='create-form-button'>CANCEL</Button>
            </div>
        }
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  recipe: state.privateRecipes.recipe,
  editMode: state.privateRecipes.editMode,
  actionSuccessful: state.privateRecipes.actionSuccessful,
  imgbbLoading: state.privateRecipes.imgbbLoading
})

const mapDispatchToProps = dispatch => ({
  createRecipe: recipe => dispatch(createRecipe(recipe)),
  updateRecipe: recipe => dispatch(updateRecipe(recipe)),
  populateFieldsFromLS: () => dispatch(populateFieldsFromLS()),
  resetAllFields: () => dispatch(resetAllFields()),
  toggleEditMode: value => dispatch(toggleEditMode(value)),
  setAlert: (msg, type) => dispatch(setAlert(msg, type)),
  setActionSuccessfulToFalse: () => dispatch(setActionSuccessfulToFalse())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabCreate));
