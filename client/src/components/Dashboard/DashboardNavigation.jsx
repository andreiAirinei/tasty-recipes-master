import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux 
import { connect } from 'react-redux';
import { toggleEditMode } from '../../redux/private/recipes/privateRecipes.actions';

import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import { ReactComponent as RecipesIcon } from '../../assets/myrecipes2.svg';
import { ReactComponent as FavoritesIcon } from '../../assets/favorites.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/bookmark2.svg';
import { ReactComponent as HistoryIcon } from '../../assets/history.svg';

const DashboardNavigation = ({ location, toggleEditMode }) => {
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    setCurrentTab(location.pathname);
    switch (location.pathname) {
      case '/dashboard/create':
        setCurrentTab('create');
        return;
      case '/dashboard/my-recipes':
        setCurrentTab('recipes');
        return;
      case '/dashboard/favorites':
        setCurrentTab('favorites');
        return;
      case '/dashboard/bookmarks':
        setCurrentTab('bookmarks');
        return;
      case '/dashboard/history':
        setCurrentTab('history');
        return;
      default:
        return;
    }
  }, [location]);

  return (
    <div className="position-sticky dashboard-navigation sidebar-menu d-flex flex-row flex-md-column justify-content-center mb-4">
      <Link
        to='/dashboard/create'
        onClick={() => toggleEditMode(false)}
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'create' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between p-1 p-sm-3 p-md-0">
          <p className='m-0 mr-2 d-none d-md-block'>Create Meal</p>
          <AddIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/my-recipes'
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'recipes' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between p-1 p-sm-3 p-md-0">
          <p className='m-0 mr-2 d-none d-md-block'>My Recipes</p>
          <RecipesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/favorites'
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'favorites' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between p-1 p-sm-3 p-md-0">
          <p className='m-0 mr-2 d-none d-md-block'>Favorites</p>
          <FavoritesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/bookmarks'
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'bookmarks' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between p-1 p-sm-3 p-md-0">
          <p className='m-0 mr-2 d-none d-md-block'>Bookmarks</p>
          <BookmarksIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/history'
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'history' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between p-1 p-sm-3 p-md-0">
          <p className='m-0 mr-2 d-none d-md-block'>History</p>
          <HistoryIcon className='icon-small' />
        </div>
      </Link>

    </div>
  )
}

export default withRouter(connect(null, { toggleEditMode })(DashboardNavigation));
