import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PrivateRoute from './routing/PrivateRoute';
import ReactGA from 'react-ga';

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
    ReactGA.initialize('UA-145876927-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [getLatestRecipes, loadUser]);

  return (
    <Fragment>
      <Layout>
        <TransitionGroup>
          <CSSTransition
            // key={1}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <Switch>
              <Suspense fallback={<LoadingSpinner />}>
                <Route exact path='/' component={HomePage} />
                <Route path='/recipes' component={RecipesDirectory} />
                <Route path='/ingredients' component={IngredientsPage} />
                <Route path='/contact' component={ContactPage} />
                <PrivateRoute path='/dashboard' component={DashboardPage} />
              </Suspense>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
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
