import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipesItem = ({ match, recipe, handleDeleteRecipe, handleEditRecipe }) => {

  const [warning, setWarning] = useState(false);

  const handleWarning = e => {
    e.preventDefault();
    e.stopPropagation();
    setWarning(true);
  }

  const handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();
    setWarning(false);
  }

  const { _id, name, imageFromIMGBB } = recipe;

  return (
    <Link to={`${match.url}/${_id}`} className='myrecipe myrecipe-link text-decoration-none'>
      <Card className='myrecipe-item mb-3 bg-light'>
        <Card.Img variant="top" src={imageFromIMGBB || require('../../../../assets/no_image_available.jpg')} className='myrecipe-thumbnail' />
        <Card.Body className={`d-flex flex-column justify-content-between ${warning && 'opacity-02'}`}>
          <Card.Title className='text-size-1 mb-4'>{name}</Card.Title>
          <div className="d-flex">
            <Button className='mr-2' variant="primary" type='button' size='sm'>VIEW</Button>
            <Button onClick={(e) => { handleEditRecipe(e, _id) }} variant="warning" type='button' size='sm'>EDIT</Button>
            <Button onClick={handleWarning} className='ml-auto d-block' variant="secondary" type='button' size='sm'>DELETE</Button>
          </div>
        </Card.Body>
        <div className={`question-popup p-3 text-size-09 ${!warning && 'd-none'}`}>
          <p className='text-dark'>Are you sure you want to remove the recipe from the list?</p>
          <div className="d-flex flex-row justify-content-center">
            <Button onClick={handleCancel} variant='dark' size='sm' className='mx-1'>CANCEL</Button>
            <Button onClick={(e) => { handleDeleteRecipe(e, _id) }} size='sm' className='mx-1 response-yes'>REMOVE</Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default withRouter(RecipesItem);
