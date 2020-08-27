import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Bootstrap
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const FavoritesItem = ({ recipe, handleRemove }) => {
  const [warning, setWarning] = useState(false);

  const { _id, recipeID, recipeName, recipeImageUrl } = recipe;

  const handleWarning = e => {
    e.preventDefault();
    e.stopPropagation();
    setWarning(true);
  };

  const handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();
    setWarning(false);
  }

  const handleDelete = e => {
    handleRemove(e, _id);
  }

  return (
    <Link to={`/recipes/recipe/${recipeID}`} className='text-decoration-none'>
      <div className='collection-list--item mb-4 mx-auto text-center'>
        <div className={`item-thumbnail p-1 ${warning && 'opacity-02'}`}>
          <Image src={recipeImageUrl} fluid rounded />
          <button onClick={handleWarning} className="remove-item outline-none border-0 text-danger font-weight-bold m-0 p-0 d-flex align-items-center justify-content-center">
            <p className='p-0 m-0'>X</p>
          </button>
          <p className='item-name text-dark m-0 my-3'>{recipeName}</p>
        </div>

        <div className={`question-popup p-3 bg-light text-size-09 ${!warning && 'd-none'}`}>
          <p className='text-dark'>Are you sure you want to remove the recipe from the list?</p>
          <div className="d-flex flex-row justify-content-center">
            <Button onClick={handleCancel} variant='dark' size='sm' className='mx-1'>CANCEL</Button>
            <Button onClick={handleDelete} variant='secondary' size='sm' className='mx-1'>DELETE</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FavoritesItem;
