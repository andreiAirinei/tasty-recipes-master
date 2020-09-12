import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sticky } from 'react-sticky';

// Redux
import { connect } from 'react-redux';
import {
  setActiveCategory,
  fetchCountries,
  fetchDishTypes
} from '../../../redux/category/category.actions';
import { setInfinityListSettings } from '../../../redux/ui/ui.actions';
import { openModalCredentials } from '../../../redux/modals/credentialsModal/credentialsModal.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import {
  selectCountriesList,
  selectDishTypes
} from '../../../redux/category/category.selectors';

// Components
import SidebarButton from './SidebarButton';
import ExpandableList from '../../ExpandableList/ExpandableList';

import Button from 'react-bootstrap/Button';

const CollectionSidebar = ({
  setActiveCategory,
  fetchCountries,
  fetchDishTypes,
  countriesList,
  dishTypes,
  isAuthenticated,
  openModalCredentials
}) => {

  const [isMobileDevice, setIsMobileDevice] = useState(null);

  useEffect(() => {
    fetchCountries();
    fetchDishTypes();
    window.innerWidth < 576 ? setIsMobileDevice(true) : setIsMobileDevice(false);
    window.addEventListener('resize', handleWindowResize);
  }, [fetchCountries, fetchDishTypes, isMobileDevice]);

  // The 'currentTarget' read-only property of the Event interface identifies the current target for the event, as the event traverses the DOM. It always refers to the element to which the event handler has been attached, as opposed to Event.target, which identifies the element on which the event occurred and which may be its descendant.
  const handleSidebarButton = e => {
    setActiveCategory({
      type: e.currentTarget.dataset.name,
      isCountry: e.currentTarget.dataset.iscountry
    });

    setInfinityListSettings({
      idxStart: 0,
      idxEnd: 12
    })

    scrollToCustomY(580);
  }

  const handleWindowResize = () => {
    window.innerWidth < 576 ? setIsMobileDevice(true) : setIsMobileDevice(false);
  };

  const scrollToCustomY = (posY) => {
    if (window.scrollY > posY) window.scrollTo(0, posY);
  };

  // If user is not authenticated it will render Credentials Modal, otherwize it will Link to dashboard/create
  const handleCreateButton = e => {
    if (!isAuthenticated) {
      e.preventDefault();
      openModalCredentials();
    }
  }

  return (
    <Sticky
      topOffset={isMobileDevice ? -52 : -150}
      bottomOffset={isMobileDevice ? 52 : 150}
    >
      {
        ({ style, isSticky }) => (
          <div
            className='sidebar-category bg-white pb-2'
            style={{ ...style, marginTop: isSticky ? (isMobileDevice ? '52px' : '150px') : '0px', zIndex: 2 }}
          >
            <h4 className='text-dark'>Recipes</h4>
            <SidebarButton
              handleClick={handleSidebarButton}
              text='All'
            />
            <SidebarButton handleClick={handleSidebarButton} text='Latest' />
            <ExpandableList listName='Dish Type'>
              {
                dishTypes && dishTypes.map(dish => (
                  <SidebarButton
                    key={dish.strCategory}
                    text={dish.strCategory}
                    handleClick={handleSidebarButton}
                    isListItem
                  />
                ))
              }
            </ExpandableList>
            <ExpandableList listName='World Cuisine'>
              {
                countriesList && countriesList.map(country => (
                  <SidebarButton
                    key={country.strArea}
                    text={country.strArea}
                    iconName={country.strArea}
                    handleClick={handleSidebarButton}
                    isCountry
                    isListItem
                  />
                ))
              }
            </ExpandableList>
            <div className="mt-5">
              <Link to='/dashboard/create'>
                <Button onClick={handleCreateButton} variant='outline-danger' >Create your own!</Button>
              </Link>
            </div>
          </div>
        )
      }
    </Sticky >
  )
}

const mapStateToProps = state => ({
  countriesList: selectCountriesList(state),
  dishTypes: selectDishTypes(state),
  isAuthenticated: state.auth.isAuthenticated
})

const maDispatchToProps = dispatch => ({
  setActiveCategory: category => dispatch(setActiveCategory(category)),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchDishTypes: () => dispatch(fetchDishTypes()),
  openModalCredentials: () => dispatch(openModalCredentials())
});

export default connect(mapStateToProps, maDispatchToProps)(CollectionSidebar);
