import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import { connect } from 'react-redux';
import { setInfinityListSettings } from '../../../redux/ui/ui.actions';
import { addFavorite } from '../../../redux/private/favorites/favorites.actions';
import { addBookmark } from '../../../redux/private/bookmarks/bookmarks.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectInfinityList } from '../../../redux/recipes/recipes.selectors';
import { selectInfinityListSettings } from '../../../redux/ui/ui.selectors';

// Components
import CollectionListItem from './CollectionListItem';
import LoadingSpinner from '../../layout/LoadingSpinner';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CollectionList = ({ infinityList, infinityListSettings, setInfinityListSettings, addFavorite, addBookmark }) => {

  const fetchMoreItems = () => {
    setInfinityListSettings({
      idxStart: infinityListSettings.idxStart + 0,
      idxEnd: infinityListSettings.idxEnd + 8
    })
  };

  const handleFavIcon = (e, recipe) => {
    e.preventDefault();
    e.stopPropagation();
    addFavorite(recipe);
  }

  const handleBookmarkIcon = (e, recipe) => {
    e.preventDefault();
    e.stopPropagation();
    addBookmark(recipe);
  }

  return (
    <div className='collection-list'>
      {
        infinityList.data &&
        <InfiniteScroll
          // className='d-flex flex-row flex-wrap justify-content-center'
          className='overflow-hidden'
          dataLength={infinityList.data.length}
          hasMore={infinityList.hasMore}
          next={fetchMoreItems}
          loader={<LoadingSpinner />}
        >
          <Row className='p-2'>
            {
              infinityList.data.map((recipe, idx) => (
                <Col xs={6} md={4} key={idx} className='p-0 px-1'>
                  <CollectionListItem
                    key={recipe.idMeal}
                    recipeID={recipe.idMeal}
                    name={recipe.strMeal}
                    imageURL={recipe.strMealThumb}
                    handleFavIcon={handleFavIcon}
                    handleBookmarkIcon={handleBookmarkIcon}
                  />
                </Col>
              ))
            }
          </Row>
        </InfiniteScroll>
      }
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  infinityList: selectInfinityList,
  infinityListSettings: selectInfinityListSettings
});

const mapDispatchToProps = dispatch => ({
  setInfinityListSettings: settings => dispatch(setInfinityListSettings(settings)),
  addFavorite: recipe => dispatch(addFavorite(recipe)),
  addBookmark: recipe => dispatch(addBookmark(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);

// #####################################
