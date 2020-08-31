import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import RecipeOverview from '../components/RecipeOverview/RecipeOverview';

// We don't need withRouter as we have 'match' prop from the App.jsx Route
const RecipePage = ({ match }) => {
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
