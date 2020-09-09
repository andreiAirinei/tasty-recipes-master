import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// Components
import DashboardNavigation from './DashboardNavigation';
import TabCreate from './Tabs/TabCreate/TabCreate';
import TabMyRecipes from './Tabs/TabMyRecipes/TabMyRecipes';
import TabFavorites from './Tabs/TabFavorites/TabFavorites';
import TabBookmarks from './Tabs/TabBookmarks/TabBookmarks';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DashboardDirectory = ({ match }) => {

  return (
    <div className='dashboard-directory mt-3 mt-md-5'>
      <Row>
        <Col md={3} lg={2}>
          <DashboardNavigation />
        </Col>
        <Col md={9} lg={10}>
          <Switch>
            <Route exact path={`${match.url}/create`} component={TabCreate} />
            <Route exact path={`${match.url}/my-recipes`} component={TabMyRecipes} />
            <Route exact path={`${match.url}/favorites`} component={TabFavorites} />
            <Route exact path={`${match.url}/bookmarks`} component={TabBookmarks} />
          </Switch>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(DashboardDirectory);
