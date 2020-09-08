import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { setActiveTab } from '../../redux/dashboard/dashboard.actions';

// Components
import DashboardNavigation from './DashboardNavigation';
import TabCreate from './Tabs/TabCreate/TabCreate';
import TabMyRecipes from './Tabs/TabMyRecipes/TabMyRecipes';
import TabFavorites from './Tabs/TabFavorites/TabFavorites';
import TabBookmarks from './Tabs/TabBookmarks/TabBookmarks';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DashboardDirectory = ({ activeTab, setActiveTab }) => {

  useEffect(() => {
    // Replicating componentWillUnmount
    return () => {
      setActiveTab('create');
    }
  }, [])

  return (
    <div className='dashboard-directory mt-3 mt-md-5'>
      <Row>
        <Col md={3} lg={2}>
          <DashboardNavigation />
        </Col>
        <Col md={9} lg={10}>
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

const mapDispatchToprops = dispatch => ({
  setActiveTab: tab => dispatch(setActiveTab(tab))
});

export default connect(mapStateToProps, mapDispatchToprops)(DashboardDirectory);
