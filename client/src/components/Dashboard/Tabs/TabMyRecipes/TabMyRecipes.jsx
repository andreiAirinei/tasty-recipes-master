import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// Components
import RecipesContainer from './RecipesContainer.jsx';
import ViewContainer from '../../ViewContainer/ViewContainer.jsx';

const TabMyRecipes = ({ match }) => {

  return (
    <Switch>
      <Route exact path={match.url} component={RecipesContainer} />
      <Route exact path={`${match.url}/:id`} component={ViewContainer} />
    </Switch>
  )
}

export default withRouter(TabMyRecipes);
