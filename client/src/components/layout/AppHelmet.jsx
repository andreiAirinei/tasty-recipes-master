import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

const AppHelmet = ({ title }) => {
  return (
    <Fragment>
      {title ? (<Helmet title={`Tasty Recipes | ${title}`} />) :
        (<Helmet title={`Tasty Recipes`} />)}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  title: state.ui.title
})

export default connect(mapStateToProps)(AppHelmet);
