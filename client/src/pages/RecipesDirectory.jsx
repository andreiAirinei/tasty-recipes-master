import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import RecipePage from './RecipePage';
import CollectionPage from './CollectionPage';


const RecipesDirectory = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}`} component={CollectionPage} />
      <Route path={`${match.url}/recipe`} component={RecipePage} />
    </Switch>
  )
}

export default RecipesDirectory;
