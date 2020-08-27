import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import TimeAndDifficulty from '../../TimeAndDifficulty/TimeAndDifficulty';

// Bootstrap Components
import Card from 'react-bootstrap/Card';

const SliderItem = ({ recipeID, name, category, imgURL, onClick }) => {

  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoaded = () => setImageLoading(false);

  return (
    <Link to={`/recipes/recipe/${recipeID}`} className='text-decoration-none text-dark'>
      <Card className='slider-item mx-1 border-0' onClick={onClick}>
        <div className="slider-item-img">
          <Card.Img
            variant="top"
            src={`${imgURL}`}
            onLoad={handleImageLoaded}
            className={`${imageLoading && 'd-none'}`} />
        </div>
        <div className="card-layout d-flex flex-column justify-content-between">
          <div className="card-layout-top">
            <Card.Body className='p-0 pt-3'>
              {
                category ?
                  <Card.Text className='text-danger mb-1 l-spacing-2'>{category}</Card.Text>
                  : <hr />
              }
              <Card.Text className='card-title pr-1 color-1'>{shortenTitle(name)}</Card.Text>
            </Card.Body>
          </div>
          <div className="card-layout-footer">
            <TimeAndDifficulty />
          </div>
        </div>

      </Card>
    </Link>
  )
}

const shortenTitle = (title) => {
  let words = title.split(" ");
  let newTitle = '';
  for (let i = 0; i < 4; i++) {
    if (words[i] === undefined) break;
    newTitle += words[i] + " ";
  }
  return newTitle;
}

export default SliderItem;
