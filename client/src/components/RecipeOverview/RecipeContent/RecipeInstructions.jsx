import React from 'react';

// Redux
import { connect } from 'react-redux';
import { modalOpen, setVideoURL } from '../../../redux/modals/videoModal/videoModal.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectSingleRecipe } from '../../../redux/recipes/recipes.selectors';

// Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const RecipeInstructions = ({
  singleRecipe,
  setVideoURL,
  modalOpen
}) => {

  const handleInstructions = (instructions) => {
    let stepCount = 1;
    let newInstructions = instructions.replace(/\r/g, "");
    newInstructions = newInstructions.replace(/\n\s*/g, chars => {
      stepCount++;
      return `
        <div class="step my-4">
          <h5 class='d-inline bg-white pr-3 text-info'>Step ${stepCount}</h5>
        </div>
      `;
    });

    return { __html: newInstructions };
  }

  const handleVideoButton = () => {
    setVideoURL(singleRecipe.strYoutube);
    modalOpen();
  }

  return (
    <div className="recipe-steps mb-5">
      {singleRecipe &&
        <>
          <div className="how-to d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
            <h2 className='mb-2 m-sm-0 text-center text-sm-left'>How to make it</h2>
            {
              singleRecipe.strYoutube &&
              <OverlayTrigger placement='top' overlay={<Tooltip>See video instructions!</Tooltip>}>
                <button className="youtube-link" onClick={handleVideoButton}>
                  <img src={require('../../../assets/youtube.svg')} alt="Youtube Link" />
                </button>
              </OverlayTrigger>
            }

          </div>

          <div className="instructions">
            <div className="step my-4">
              <h5 className='d-inline bg-white pr-3 text-info'>Step 1</h5>
            </div>
          </div>
          <div className="instructions text-justify mb-5" dangerouslySetInnerHTML={handleInstructions(singleRecipe.strInstructions)} />
        </>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  singleRecipe: selectSingleRecipe
});

const mapDispatchToProps = dispatch => ({
  setVideoURL: video => dispatch(setVideoURL(video)),
  modalOpen: () => dispatch(modalOpen()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInstructions);
