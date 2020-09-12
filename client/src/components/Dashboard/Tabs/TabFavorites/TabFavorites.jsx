import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import {
  fetchFavorites,
  removeFavorite
} from '../../../../redux/private/favorites/favorites.actions';

// Components
import TabListItem from '../TabListItem';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TabFavorites = ({ fetchFavorites, favorites, removeFavorite }) => {

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    removeFavorite(id);
  }

  return (
    <div className='tab-favorites'>
      <h1>Favorites</h1>
      <hr />
      {
        favorites.length < 1 && <h6><em>You don't have any favorite recipes saved. <Link to='/recipes' className='text-danger'><u>Browse recipes!</u></Link></em></h6>
      }
      <Row>
        {
          favorites && favorites.map(fav => (
            <Col xs={6} sm={4} key={fav._id}>
              <TabListItem
                recipe={fav}
                handleRemove={handleRemove} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  favorites: state.favorites.favorites
})

const mapDispatchToProps = dispatch => ({
  fetchFavorites: () => dispatch(fetchFavorites()),
  removeFavorite: id => dispatch(removeFavorite(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFavorites);
