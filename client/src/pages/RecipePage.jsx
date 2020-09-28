import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';

// Components
import RecipeOverview from '../components/RecipeOverview/RecipeOverview';

// We don't need withRouter as we have 'match' prop from the App.jsx Route
const RecipePage = ({ match }) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className='recipe-page'>
      <Switch>
        <Route
          exact
          path={`${match.url}`}
          render={() => <Redirect to='/' />}
        />
        <Route
          // exact
          path={`${match.url}/:recipeID`}
          component={RecipeOverview}
        />
      </Switch>
    </div>
  )
};

export default RecipePage;
