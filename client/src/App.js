import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';

// JWToken
import setAuthToken from './utils/setAuthToken';

// Redux
import { connect } from 'react-redux';
import { loadUser } from './redux/auth/auth.actions';
import { getLatestRecipes } from './redux/recipes/recipes.actions';

// Components
import Layout from './components/layout/Layout';
import CredentialsModal from './components/Modals/CredentialsModal/CredentialsModal';
import IngredientsModal from './components/Modals/IngredientModal/IngredientModal';
import VideoModal from './components/Modals/VideoModal/VideoModal';
import LoadingSpinner from './components/layout/LoadingSpinner';

// If exists, set token on default global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const RecipesDirectory = lazy(() => import('./pages/RecipesDirectory'));
const IngredientsPage = lazy(() => import('./pages/IngredientsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

const App = ({ getLatestRecipes, loadUser }) => {
  useEffect(() => {
    loadUser();
    getLatestRecipes();
  }, [getLatestRecipes, loadUser]);

  return (
    <Fragment>
      <Layout>
        <Switch>
          <Suspense fallback={<LoadingSpinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/recipes' component={RecipesDirectory} />
            <Route path='/ingredients' component={IngredientsPage} />
            <Route path='/contact' component={ContactPage} />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
          </Suspense>
        </Switch>
      </Layout>
      <CredentialsModal />
      <IngredientsModal />
      <VideoModal />
    </Fragment>
  );
}

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(loadUser()),
  getLatestRecipes: () => dispatch(getLatestRecipes())
});

export default connect(null, mapDispatchToProps)(App);
