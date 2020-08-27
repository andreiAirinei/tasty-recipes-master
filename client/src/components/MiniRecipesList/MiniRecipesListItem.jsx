import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { closeModalIngredient } from '../../redux/modals/ingredientModal/ingredientModal.actions';

// Bootstrap
import Image from 'react-bootstrap/Image';

const MiniRecipesListItem = ({ recipeID, name, category, imageURL, closeModalIngredient }) => {
  return (
    <Link
      to={`/recipes/recipe/${recipeID}`}
      className='text-decoration-none text-dark'
      onClick={closeModalIngredient}
    >
      <div className='latest-list-item d-flex align-items-center mb-1'>
        <div className="image-holder">
          <Image src={`${imageURL}/preview`} alt={name} thumbnail />
        </div>
        <div className="details ml-3 w-100">
          <h6>{name}</h6>
          <p className='text-danger m-0'><em>{category}</em></p>
        </div>
      </div >
    </Link>
  )
}

export default connect(null, { closeModalIngredient })(MiniRecipesListItem);
