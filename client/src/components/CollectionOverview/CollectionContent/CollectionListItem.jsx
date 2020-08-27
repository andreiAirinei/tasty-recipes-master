import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconFavorite } from '../../../assets/favorites2.svg';
import { ReactComponent as IconBookmark } from '../../../assets/bookmark.svg';

// Bootstrap
import Image from 'react-bootstrap/Image';

const CollectionListItem = ({ recipeID, imageURL, name, handleFavIcon, handleBookmarkIcon }) => {

  const recipe = {
    recipeID: recipeID,
    recipeName: name,
    recipeImageUrl: imageURL
  };

  const handleBookmark = e => {
    handleBookmarkIcon(e, recipe);
  }

  const handleFavorite = e => {
    handleFavIcon(e, recipe);
  }

  return (
    <Link to={`/recipes/recipe/${recipeID}`} className='text-decoration-none'>
      <div className='collection-list--item mb-4 mx-auto text-center'>
        <div className='item-thumbnail mb-2 p-1'>
          <Image src={imageURL} alt={name} fluid rounded />
          <div onClick={handleBookmark} className="bookmark bg-success d-flex align-items-center justify-content-center">
            <IconBookmark className='icon-medium m-2' />
            <p className='d-none text-white text-size-08 p-0 m-0 mr-3'>SAVE RECIPE</p>
          </div>
          <div onClick={handleFavorite} className="favorite bg-warning d-flex align-items-center justify-content-center">
            <IconFavorite className='icon-medium m-2' />
            <p className='d-none text-white text-size-08 p-0 m-0 mr-3'>ADD FAVORITE</p>
          </div>
        </div>
        <p className='item-name text-dark'>{name}</p>
      </div>
    </Link>
  )
}

export default CollectionListItem;
