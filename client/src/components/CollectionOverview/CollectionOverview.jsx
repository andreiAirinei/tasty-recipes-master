import React from 'react';
import { StickyContainer } from 'react-sticky';

// Redux
import { connect } from 'react-redux';

// Selectors
import { selectActiveCategory } from '../../redux/category/category.selectors';

// Components
import SectionTitle from '../layout/SectionTitle';
import CollectionSidebar from './CollectionSidebar/CollectionSidebar';
import CollectionContent from './CollectionContent/CollectionContent';

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CollectionOverview = ({ activeCategory }) => {
  return (
    <div className='collection-overview'>
      <SectionTitle title={`${activeCategory.type} Recipes`} />
      <StickyContainer className='mb-5'>
        <Row>
          <Col xs={12} md={3} >
            <CollectionSidebar />
          </Col>
          <Col xs={12} md={9} >
            <CollectionContent />
          </Col>
        </Row>
      </StickyContainer>
    </div>
  )
}

const mapStateToProps = state => ({
  activeCategory: selectActiveCategory(state)
});

export default connect(mapStateToProps)(CollectionOverview);
