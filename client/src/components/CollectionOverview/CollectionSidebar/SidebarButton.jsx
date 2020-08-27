import React from 'react';

// Redux
import { connect } from 'react-redux';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectActiveCategory } from '../../../redux/category/category.selectors';

const SidebarButton = ({
  text,
  handleClick,
  iconName = null,
  isListItem = false,
  isCountry,
  activeCategory,
  handleExpand
}) => {

  const handleExpandableListButton = (e) => {
    handleClick(e);
    isListItem && handleExpand();
  }

  return (
    <button
      data-name={text}
      data-iscountry={isCountry}
      onClick={handleExpandableListButton}
      className={`btn-category w-100 text-left font-weight-bold text-decoration-none border-0 px-2 py-1 d-flex align-items-center justify-content-between 
      ${isListItem && `btn-category--secondary`}
      ${activeCategory.type === text && `btn-category--active`}
      `}
    >
      {text}
      {
        iconName && (iconName !== 'Unknown') && < img src={require(`../../../assets/flags/${iconName}.png`)} alt={`${iconName} flag`} className='dropdown-flag text-right' />
      }
    </button>
  )
}

const mapStateToProps = createStructuredSelector({
  activeCategory: selectActiveCategory
})

export default connect(mapStateToProps)(SidebarButton);
