import React from 'react';

// Redux
import { connect } from 'react-redux';

// Selectors
import { selectPopularCategories } from '../../redux/category/category.selectors';

// Components
import CategoriesItem from './CategoriesItem';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SectionTitle from '../layout/SectionTitle';

const CategoriesContainer = ({ popularCategories }) => {
  return (
    <Container className='categories-container' fluid='xl'>
      <SectionTitle title='Popular Categories' />
      <Row>
        {
          popularCategories.map(category =>
            <CategoriesItem key={category.id} name={category.name} imgURL={category.icon} />)
        }
      </Row>
      <div className="underlay-image">
        <img src={require('../../assets/ingredients/limes.png')} alt="Oranges" />
      </div>
    </Container>
  )
};

const mapStateToProps = state => ({
  popularCategories: selectPopularCategories(state)
})

export default connect(mapStateToProps)(CategoriesContainer);