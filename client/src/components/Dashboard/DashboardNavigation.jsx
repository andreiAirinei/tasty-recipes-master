import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as AddIcon } from '../../assets/plus.svg';
import { ReactComponent as RecipesIcon } from '../../assets/myrecipes.svg';
import { ReactComponent as FavoritesIcon } from '../../assets/favorites.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/bookmark2.svg';

const DashboardNavigation = () => {

  return (
    <div className="dashboard-navigation d-flex flex-row flex-md-column justify-content-center">
      <Link
        to='/dashboard/create'
        className='text-decoration-none rounded-sm text-left outline-none border-0 p-2 bg-tasty text-white icon-white'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Create Meal</p>
          <AddIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/my-recipes'
        className='dashboard-link text-decoration-none text-left outline-none text-dark border-0 mx-1 mx-md-0 p-2'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>My Recipes</p>
          <RecipesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/favorites'
        className='dashboard-link text-decoration-none text-left outline-none text-dark border-0 mx-1 mx-md-0 p-2'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Favorites</p>
          <FavoritesIcon className='icon-small' />
        </div>
      </Link>
      <Link
        to='/dashboard/bookmarks'
        className='dashboard-link text-decoration-none text-left outline-none text-dark border-0 mx-1 mx-md-0 p-2'
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className='m-0 mr-2'>Bookmarks</p>
          <BookmarksIcon className='icon-small' />
        </div>
      </Link>

    </div>
  )
}

export default DashboardNavigation;
