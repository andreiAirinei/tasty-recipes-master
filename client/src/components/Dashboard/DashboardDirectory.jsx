import React from 'react';

// Redux
import { connect } from 'react-redux';

// Components
import DashboardNavigation from './DashboardNavigation';
import TabCreate from './Tabs/TabCreate/TabCreate';
import TabMyRecipes from './Tabs/TabMyRecipes';
import TabFavorites from './Tabs/TabFavorites/TabFavorites';
import TabBookmarks from './Tabs/TabBookmarks/TabBookmarks';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const DashboardDirectory = ({ activeTab }) => {
  return (
    <div className='dashboard-directory mt-3 mt-md-5'>
      <Row>
        <Col md={3} lg={2}>
          <DashboardNavigation />
        </Col>
        <Col md={9} lg={10}>
          <div className="tab-overview mt-4 mt-md-0">

          </div>
          {activeTab === 'create' && <TabCreate />}
          {activeTab === 'myrecipes' && <TabMyRecipes />}
          {activeTab === 'favorites' && <TabFavorites />}
          {activeTab === 'bookmarks' && <TabBookmarks />}
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  activeTab: state.dashboard.activeTab
});

export default connect(mapStateToProps)(DashboardDirectory);
