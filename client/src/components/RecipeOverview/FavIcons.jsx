import React, { useEffect, useState } from 'react';
import { ReactComponent as StarEmpty } from '../../assets/star_empty.svg';
import { ReactComponent as StarFilled } from '../../assets/star_filled.svg';

// Redux
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/private/favorites/favorites.actions';

const FavIcons = ({ favorites, addFavorite, removeFavorite, recipe }) => {

  const [state, setState] = useState({
    id: null,
    isFavorite: false
  });

  useEffect(() => {
    findFavorite(recipe.recipeID);
    // eslint-disable-next-line
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
          (<StarFilled onClick={() => removeFavorite(recipe.recipeID)} className='fav-icon--xlarge' />)
          :
          (<StarEmpty onClick={() => addFavorite({ ...recipe })} className='fav-icon--xlarge' />)
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