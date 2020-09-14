import React, { Fragment, useEffect } from 'react';
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

// Pages
import HomePage from './pages/HomePage';
import RecipesDirectory from './pages/RecipesDirectory';
import IngredientsPage from './pages/IngredientsPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

// If exists, set token on default global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ getLatestRecipes, loadUser }) => {
  useEffect(() => {
    loadUser();
    getLatestRecipes();
  }, [getLatestRecipes, loadUser]);

  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/recipes' component={RecipesDirectory} />
          <Route path='/ingredients' component={IngredientsPage} />
          <Route path='/contact' component={ContactPage} />
          <PrivateRoute path='/dashboard' component={DashboardPage} />
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
