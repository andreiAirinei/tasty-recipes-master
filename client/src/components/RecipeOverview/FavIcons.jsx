import React, { useEffect, useState } from 'react';
import { ReactComponent as StarEmpty } from '../../assets/star_empty.svg';
import { ReactComponent as StarFilled } from '../../assets/star_filled.svg';

// Redux
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/private/favorites/favorites.actions';

// Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const FavIcons = ({ favorites, addFavorite, removeFavorite, recipe }) => {

  const [state, setState] = useState({
    id: null,
    isFavorite: false
  });

  useEffect(() => {
    findFavorite(recipe.recipeID);
  }, [favorites]);

  const findFavorite = id => {
    const recipeFound = favorites.find(fav => fav.recipeID === id);
    if (recipeFound) setState({ ...state, id: recipeFound.recipeID, isFavorite: true });
    if (!recipeFound) setState({ ...state, id: null, isFavorite: false });
  };

  return (
    <div className='fav-icons'>
      {
        state.isFavorite ?
          (<OverlayTrigger placement='top' overlay={<Tooltip>Remove from Favorites</Tooltip>}>
            <StarFilled onClick={() => removeFavorite(recipe.recipeID)} className='fav-icon--xlarge' />
          </OverlayTrigger>)
          :
          (<OverlayTrigger placement='top' overlay={<Tooltip>Add to Favorites</Tooltip>}>
            <StarEmpty onClick={() => addFavorite({ ...recipe })} className='fav-icon--xlarge' />
          </OverlayTrigger>)
      }
    </div>
  )
}

const mapStateToProps = state => ({
  favorites: state.favorites.favorites
});

const mapDispatchToProps = dispatch => ({
  addFavorite: id => dispatch(addFavorite(id)),
  removeFavorite: id => dispatch(removeFavorite(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FavIcons);