import React from 'react';
import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import { ReactComponent as RecipesIcon } from '../../assets/myrecipes.svg';
import { ReactComponent as FavoritesIcon } from '../../assets/favorites.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/bookmark2.svg';


// Redux
import { connect } from 'react-redux';
import { setActiveTab } from '../../redux/dashboard/dashboard.actions';

// Bootstrap
import Button from 'react-bootstrap/Button';

const DashboardNavigation = ({ activeTab, setActiveTab }) => {

  const handleClick = e => {
    e.preventDefault();
    setActiveTab(e.currentTarget.dataset.tab);
  }

  return (
    <div className="dashboard-navigation d-flex flex-row flex-md-column justify-content-center">
      <Button
        onClick={handleClick}
        data-tab='create'
        variant='none'
        className={`text-left outline-none text-dark border-0 ${activeTab === 'create' && 'bg-tasty text-white icon-white'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Create Meal</p>
          <AddIcon className='icon-small' />
        </div>
      </Button>
      <Button
        onClick={handleClick}
        data-tab='myrecipes'
        className={`text-left outline-none text-dark border-0 mx-1 mx-md-0 ${activeTab === 'myrecipes' && 'bg-tasty text-white icon-white'}`}
        variant='none'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>My Recipes</p>
          <RecipesIcon className='icon-small' />
        </div>
      </Button>
      <Button
        onClick={handleClick}
        data-tab='favorites'
        className={`text-left outline-none text-dark border-0 ${activeTab === 'favorites' && 'bg-tasty text-white icon-white'}`}
        variant='none'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Favorites</p>
          <FavoritesIcon className='icon-small' />
        </div>
      </Button>
      <Button
        onClick={handleClick}
        data-tab='bookmarks'
        className={`text-left outline-none text-dark border-0 ${activeTab === 'bookmarks' && 'bg-tasty text-white icon-white'}`}
        variant='none'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Bookmarks</p>
          <BookmarksIcon className='icon-small' />
        </div>
      </Button>
    </div>
  )
}

const mapStateToProps = state => ({
  activeTab: state.dashboard.activeTab
});

const mapDispatchToProps = dispatch => ({
  setActiveTab: tab => dispatch(setActiveTab(tab))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavigation);
