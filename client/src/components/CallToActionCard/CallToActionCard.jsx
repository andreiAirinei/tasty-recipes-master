import React from 'react';
import { Link } from 'react-router-dom';
import ReactLogo from '../../assets/tasty-recipes-logo-orange.svg';

// Redux
import { connect } from 'react-redux';
import { openModalCredentials } from '../../redux/modals/credentialsModal/credentialsModal.actions';

// Bootstrap
import Button from 'react-bootstrap/Button';

const CallToActionCard = ({ withLogo = false, openModalCredentials, isAuthenticated }) => {
  return (
    <div className="cta-card p-3 mx-auto box-shadow">
      <div className="inner-box p-5 text-center">
        <h5><span className='font-weight-bold  text-danger'>Create</span> your own</h5>
        {!withLogo && <h5>tasty recipes</h5>}
        {
          withLogo &&
          <img src={ReactLogo} alt="Chef Hat" className='d-block mx-auto tasty-logo my-3' />
        }

        {
          isAuthenticated ?
            <Link to='/dashboard' className='btn btn-danger'>Go to Dashboard</Link> :
            <Button onClick={openModalCredentials} variant='danger' className='px-4 mt-3 l-spacing-1 text-uppercase' >Join now!</Button>
        }

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  openModalCredentials: () => dispatch(openModalCredentials())
});

export default connect(mapStateToProps, mapDispatchToProps)(CallToActionCard);
