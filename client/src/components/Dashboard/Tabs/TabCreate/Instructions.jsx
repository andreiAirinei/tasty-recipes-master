import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
  addStep,
  removeStep,
  setStepToEdit,
  setCurrentStepValue,
  saveStepChanges,
  cancelStepChanges,
  editStepValue
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Instructions = ({ addStep, editStep, editStepValue, cancelStepChanges, saveStepChanges, removeStep, steps, setStepToEdit, currentStep, setCurrentStepValue }) => {

  const handleTextareaChange = e => {
    setCurrentStepValue(e.target.value);
  }

  const handleStepEdit = (id, value) => {
    setStepToEdit({ id, value });
  }

  const handleStepSave = () => {
    saveStepChanges();
  }

  const handleInputEdit = e => {
    editStepValue(e.target.value);
  }

  return (
    <div className='tab-create-section shadow'>
      {/* How to make it */}
      <h4 className='text-center py-3 mb-3'>How to make it</h4>

      {
        steps.map((step, idx) => (
          <Card key={step.id} className='my-5 shadow-sm'>
            <Card.Header as="h6">Step {idx + 1}</Card.Header>
            <Card.Body>
              {
                editStep.id === step.id ?
                  <InputGroup className='recipe-steps flex-column border-none'>
                    <FormControl autoFocus as="textarea" name="step-edit" aria-label="Step-edit" value={editStep.value} onChange={handleInputEdit} required />
                  </InputGroup>
                  :
                  <>{step.value}</>
              }
              <div className="d-flex justify-content-end step-buttons mt-3">
                {
                  editStep.id === step.id ?
                    <>
                      <Button onClick={() => handleStepSave(step.id)} size='sm' variant="success" className='mr-3'>SAVE CHANGES</Button>
                      <Button onClick={cancelStepChanges} size='sm' variant="outline-dark" className='mr-3'>CANCEL</Button>
                    </>
                    :
                    <>
                      <Button onClick={() => handleStepEdit(step.id, step.value)} size='sm' variant="outline-success" className='mr-3'>EDIT</Button>
                      <Button onClick={() => removeStep(step.id)} size='sm' variant="outline-secondary">REMOVE</Button>
                    </>
                }

              </div>
            </Card.Body>
          </Card>
        ))
      }

      <InputGroup className='recipe-steps flex-column border-none'>
        <FormControl as="textarea" name="step" aria-label="Step" value={currentStep} onChange={handleTextareaChange} placeholder='Add here cooking steps...' />
      </InputGroup>

      <button onClick={addStep} className='btn btn-dark outline-none text-size-08 mx-auto d-block my-3'>ADD STEP</button>
    </div>
  )
};

const mapStateToProps = state => ({
  steps: state.privateRecipes.recipe.steps,
  currentStep: state.privateRecipes.recipe.currentStep,
  editStep: state.privateRecipes.recipe.editStep
});

const mapDispatchToProps = dispatch => ({
  setCurrentStepValue: txt => dispatch(setCurrentStepValue(txt)),
  addStep: () => dispatch(addStep()),
  removeStep: id => dispatch(removeStep(id)),
  setStepToEdit: id => dispatch(setStepToEdit(id)),
  editStepValue: input => dispatch(editStepValue(input)),
  saveStepChanges: () => dispatch(saveStepChanges()),
  cancelStepChanges: () => dispatch(cancelStepChanges())
});

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
