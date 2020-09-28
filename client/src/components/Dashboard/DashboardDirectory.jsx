import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import DashboardNavigation from './DashboardNavigation';

// Bootstrap
import Container from 'react-bootstrap/Container';

import TabCreate from './Tabs/TabCreate/TabCreate';
import TabMyRecipes from './Tabs/TabMyRecipes/TabMyRecipes';
import TabFavorites from './Tabs/TabFavorites/TabFavorites';
import TabBookmarks from './Tabs/TabBookmarks/TabBookmarks';
import TabHistory from './Tabs/TabHistory/TabHistory';

const DashboardDirectory = ({ match, location }) => {

  return (
    <div className='dashboard-directory mt-md-2'>
      <Container fluid='xl' className='px-0'>
        <DashboardNavigation />
      </Container>

      <Container fluid='xl'>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={{ enter: 300, exit: 300 }}
            classNames="fade"
          >
            <Switch>
              <Route exact path={`${match.url}/create`} component={TabCreate} />
              <Route exact path={`${match.url}/edit/:id`} component={TabCreate} />
              <Route path={`${match.url}/my-recipes`} component={TabMyRecipes} />
              <Route exact path={`${match.url}/favorites`} component={TabFavorites} />
              <Route exact path={`${match.url}/bookmarks`} component={TabBookmarks} />
              <Route exact path={`${match.url}/history`} component={TabHistory} />
              <Route exact path={`${match.url}`} render={() => <Redirect to={`${match.url}/create`} />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </div >
  )
}

export default withRouter(DashboardDirectory);
