import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const RecipesItem = ({ match, recipe, handleDeleteRecipe, handleEditRecipe }) => {
  const { _id, name, imageFromIMGBB } = recipe;

  return (
    <Link to={`${match.url}/${_id}`} className='myrecipe-link text-decoration-none'>
      <Card className='myrecipe-item mb-3 bg-light'>
        <Card.Img variant="top" src={imageFromIMGBB || require('../../../../assets/no_image_available.jpg')} className='myrecipe-thumbnail' />
        <Card.Body className='d-flex flex-column justify-content-between'>
          <Card.Title className='text-size-1 mb-4'>{name}</Card.Title>
          <div className="d-flex">
            <Button className='mr-2' variant="primary" type='button' size='sm'>VIEW</Button>
            <Button onClick={(e) => { handleEditRecipe(e, _id) }} variant="warning" type='button' size='sm'>EDIT</Button>
            <Button onClick={(e) => { handleDeleteRecipe(e, _id) }} className='ml-auto d-block' variant="secondary" type='button' size='sm'>DELETE</Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default withRouter(RecipesItem);
