import React from 'react';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { setActiveCategory } from '../../redux/category/category.actions';

// Bootstrap
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';

const CategoriesItem = ({ name, imgURL, setActiveCategory, history }) => {

  const handleClick = () => {
    setActiveCategory({ type: name, isCountry: false });
    history.push('/recipes');
  }

  return (
    <Col xs={6} md={3} className='categories-item p-1' onClick={handleClick}>
      <div className="categories-card mx-auto">
        <Image src={imgURL} alt={name} rounded fluid />
        <h4 className='category-name text-dark font-weight-bold text-center mt-3 mb-5 l-spacing-1'>{name}</h4>
      </div>
    </Col>
  )
}

const mapDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category))
})

export default withRouter(connect(null, mapDispatchToProps)(CategoriesItem));
