import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// Components
import LoadingSpinner from '../layout/LoadingSpinner';
import DashboardNavigation from './DashboardNavigation';

// Bootstrap
import Container from 'react-bootstrap/Container';

// Lazy Loaded Tabs
const TabCreate = lazy(() => import('./Tabs/TabCreate/TabCreate'));
const TabMyRecipes = lazy(() => import('./Tabs/TabMyRecipes/TabMyRecipes'));
const TabFavorites = lazy(() => import('./Tabs/TabFavorites/TabFavorites'));
const TabBookmarks = lazy(() => import('./Tabs/TabBookmarks/TabBookmarks'));
const TabHistory = lazy(() => import('./Tabs/TabHistory/TabHistory'));

const DashboardDirectory = ({ match }) => {

  return (
    <div className='dashboard-directory mt-md-2'>
      <Container fluid='xl' className='px-0'>
        <DashboardNavigation />
      </Container>

      <Container fluid='xl'>
        <Switch>
          <Suspense fallback={<LoadingSpinner />}>
            <Route exact path={`${match.url}/create`} component={TabCreate} />
            <Route exact path={`${match.url}/edit/:id`} component={TabCreate} />
            <Route path={`${match.url}/my-recipes`} component={TabMyRecipes} />
            <Route exact path={`${match.url}/favorites`} component={TabFavorites} />
            <Route exact path={`${match.url}/bookmarks`} component={TabBookmarks} />
            <Route exact path={`${match.url}/history`} component={TabHistory} />
            <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/create`} />} />
          </Suspense>
        </Switch>
      </Container>
    </div>
  )
}

export default withRouter(DashboardDirectory);
