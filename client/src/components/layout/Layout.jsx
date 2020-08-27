import React, { Fragment } from 'react';

// Redux
import { connect } from 'react-redux';

// Components
import AppHelmet from './AppHelmet';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <Fragment>
      <AppHelmet />
      {/* Setting height of the page of minimum 100% of viewport height, thus removing white space 
      between Footer and browser's baseline */}
      <div className={`app-layout d-flex flex-column min-vh-100 ${props.isBackgroundBlurred && 'isBlurred'}`}>
        <div className="flex-grow-1">
          <Header />
          {props.children}
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isBackgroundBlurred: state.ui.isBackgroundBlurred
});

export default connect(mapStateToProps)(Layout);
