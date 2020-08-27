import React from 'react';

// Redux
import { connect } from 'react-redux';
import {
  modalOpenIngredient,
  setModalIngredient
} from '../../redux/modals/ingredientModal/ingredientModal.actions';

// Bootstrap
import Col from 'react-bootstrap/Col';

const IngredientsGroupItem = ({
  modalOpenIngredient,
  setModalIngredient,
  ingredient
}) => {

  const handleClick = e => {
    // e.preventDefault();
    setModalIngredient(ingredient.strIngredient);
    modalOpenIngredient();
  }

  return (
    <Col xs={6} sm={4} md={3} key={ingredient.idIngredient} className='px-2'>
      <button
        className='btn btn-link text-dark text-size-09 text-left px-0'
        onClick={handleClick}
      >
        <div className="d-flex align-items-center">
          <img src=
            {`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
            alt={''}
            className='ingredient-image'
          />
          <p className='text-size-09 p-0 m-0 ml-2'>{ingredient.strIngredient}</p>
        </div>
      </button>
    </Col>
  )
}

const mapDispatchToProps = dispatch => ({
  modalOpenIngredient: () => dispatch(modalOpenIngredient()),
  setModalIngredient: ingredient => dispatch(setModalIngredient(ingredient))
});

export default connect(null, mapDispatchToProps)(IngredientsGroupItem);
