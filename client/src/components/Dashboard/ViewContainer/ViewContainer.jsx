import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setCurrentRecipe } from '../../../redux/private/recipes/privateRecipes.actions';
import { modalOpen, setVideoURL } from '../../../redux/modals/videoModal/videoModal.actions';
import {
  setModalIngredient,
  modalOpenIngredient
} from '../../../redux/modals/ingredientModal/ingredientModal.actions';


// Components
import ShareButtons from '../../layout/ShareButtons';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ViewContainer = ({ current, setCurrentRecipe, modalOpen, setVideoURL, setModalIngredient, modalOpenIngredient, match }) => {

  useEffect(() => {
    setCurrentRecipe(match.params.id);
  }, [setCurrentRecipe, match.params.id]);

  const handleVideoButton = () => {
    setVideoURL(current.youtubeURL);
    modalOpen();
  }

  const handleIngredientClick = (ingredient) => {
    setModalIngredient(ingredient);
    modalOpenIngredient();
  }

  return (
    <div className='tab-create-section py-5 px-5 mt-5 shadow'>
      {current &&
        <>
          <Row className='mb-5'>
            <Col xs={12} md={5}>
              <Image src={current.imageFromIMGBB || require('../../../assets/no_image_available.jpg')} thumbnail fluid className='shadow-sm' />
            </Col>
            <Col xs={12} md={7}>
              <h1 className='font-weight-bold mt-3 mt-sm-0'>{current.name}</h1>
              <h4 className='text-danger mb-4 mb-sm-5'>{current.category}</h4>
              <div className="d-flex justify-content-center justify-content-sm-start align-items-center mb-5">
                <img src={require(`../../../assets/flags/${current.area}.png`)}
                  alt={`${current.area} flag`}
                  className='mr-4' />
                <h6 className='m-0'>Delicious <span className='font-weight-bold text-secondary l-spacing-1'>{current.area}</span> recipe</h6>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <p className='m-0 mr-3'><em>Share:</em></p>
                <ShareButtons size={20} shareURL='www.google.co.uk' />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ order: 2, span: 5 }} lg={5}>
              <h2 className='ingredients-title mb-4 text-center text-sm-left'>Ingredients</h2>
              <ul className='ingredients-list list-unstyled'>
                {
                  current.ingredients.map(item => (
                    <li key={item.id}>
                      <div
                        onClick={() => handleIngredientClick(item.name)}
                        className="ingredients-list-item d-flex flex-sm-column flex-md-row align-items-center py-1"
                      >
                        <div className="d-flex align-items-center">
                          <img src={`https://www.themealdb.com/images/ingredients/${item.name}-Small.png`} alt={item.ingredient} className='mr-1' />
                          <p className='ingredient m-0 ml-1'><em>{item.name}</em></p>
                        </div>
                        <p className='m-0'><strong>{item.quantity}</strong></p>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </Col>
            <Col sm={{ order: 1, span: 7 }} >
              <div className="how-to d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4 mr-lg-5">
                <h2 className='mb-2 m-sm-0 text-center text-sm-left'>How to make it</h2>
                {
                  <OverlayTrigger placement='top' overlay={<Tooltip>See video instructions!</Tooltip>}>
                    <button onClick={handleVideoButton} className="youtube-link">
                      <img src={require('../../../assets/youtube.svg')} alt="Youtube Link" />
                    </button>
                  </OverlayTrigger>
                }
              </div>
              {
                current.steps.map((step, idx) => (
                  <div key={idx}>
                    <h5 className='text-info'>Step {idx + 1}</h5>
                    <p>{step.value}</p>
                  </div>
                ))
              }
            </Col>
          </Row>
        </>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  current: state.privateRecipes.current
});

const mapDispatchToProps = dispatch => ({
  setCurrentRecipe: id => dispatch(setCurrentRecipe(id)),
  modalOpen: () => dispatch(modalOpen()),
  setVideoURL: url => dispatch(setVideoURL(url)),
  modalOpenIngredient: () => dispatch(modalOpenIngredient()),
  setModalIngredient: ingredient => dispatch(setModalIngredient(ingredient))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewContainer));
