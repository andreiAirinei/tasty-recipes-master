import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Redux 
import { connect } from 'react-redux';
import { toggleEditMode } from '../../redux/private/recipes/privateRecipes.actions';

import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import { ReactComponent as RecipesIcon } from '../../assets/myrecipes.svg';
import { ReactComponent as FavoritesIcon } from '../../assets/favorites.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/bookmark2.svg';

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
    }
  }, [location]);

  const handleClick = () => {
    // setTimeout is used for this specific case so that it can execute AFTER ScrollToTop.jsx logic
    setTimeout(() => {
      // Puting this event in to Call Stack / Callback Queue 
      window.scrollTo(0, 450);
    }, 0);
  }

  return (
    <div className="dashboard-navigation d-flex flex-row flex-md-column justify-content-center mb-4">
      <Link
        to='/dashboard/create'
        onClick={() => { toggleEditMode(false); handleClick(); }}
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'create' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Create Meal</p>
          <AddIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/my-recipes'
        onClick={handleClick}
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'recipes' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>My Recipes</p>
          <RecipesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/favorites'
        onClick={handleClick}
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'favorites' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Favorites</p>
          <FavoritesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/bookmarks'
        onClick={handleClick}
        className={`dashboard-link text-decoration-none rounded-sm text-left outline-none p-2 ${currentTab === 'bookmarks' ? 'withBorder text-tasty' : 'text-dark'}`}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Bookmarks</p>
          <BookmarksIcon className='icon-small' />
        </div>
      </Link>

    </div>
  )
}

export default withRouter(connect(null, { toggleEditMode })(DashboardNavigation));
