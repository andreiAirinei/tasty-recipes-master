import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
  addStep,
  setCurrentStepValue
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Instructions = ({ addStep, steps, currentStep, setCurrentStepValue }) => {

  const handleTextareaChange = e => {
    setCurrentStepValue(e.target.value);
  }

  return (
    <div className='tab-create-section shadow'>
      {/* How to make it */}
      <h4 className='bg-light text-center py-1 mt-5 mb-3'>How to make it</h4>

      {
        steps.map((step, idx) => (
          <Card key={step.id} className='my-5 shadow-sm'>
            <Card.Header as="h6">Step {idx + 1}</Card.Header>
            <Card.Body>
              <Card.Text>
                {step.step}
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
        <FormControl as="textarea" name="step" aria-label="Step" value={currentStep} onChange={handleTextareaChange} placeholder='Write here cooking steps...' />
      </InputGroup>

      <button onClick={addStep} className='btn btn-dark outline-none text-size-08 mx-auto d-block my-3'>ADD STEP</button>
    </div>
  )
};

const mapStateToProps = state => ({
  steps: state.privateRecipes.recipe.steps,
  currentStep: state.privateRecipes.recipe.currentStep
});

const mapDispatchToProps = dispatch => ({
  setCurrentStepValue: txt => dispatch(setCurrentStepValue(txt)),
  addStep: () => dispatch(addStep())
});

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);
