import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/user_profile.svg';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';
import { clearFavorites } from '../../redux/private/favorites/favorites.actions';
import { clearBookmarks } from '../../redux/private/bookmarks/bookmarks.actions';
import {
  openModalCredentials,
  setTopicLogin
} from '../../redux/modals/credentialsModal/credentialsModal.actions';

// Bootstrap
import Button from 'react-bootstrap/Button';

const LoginRegisterButtons = ({ openModalCredentials, setTopicLogin, isAuthenticated, logout, clearBookmarks, clearFavorites, history }) => {

  const handleClick = (e) => {
    e.target.id === 'registerBtn' ? setTopicLogin(false) : setTopicLogin(true);
    openModalCredentials();
  }

  const onLogout = () => {
    logout();
    history.push('/');
    clearBookmarks();
    clearFavorites();
  }

  const guestLinks = (
    <>
      <Button onClick={handleClick} id='loginBtn' variant='light' className='mr-1' size='sm'>Login</Button>
      <Button onClick={handleClick} id='registerBtn' variant='outline-danger' size='sm' className='text-dark'>Register</Button>
    </>
  );

  const authLinks = (
    <Button onClick={onLogout} variant='outline-danger' size='sm'>Logout</Button>
  )

  return (
    <Fragment>
      {/* Devices over 992px width*/}
      <div className="login-register--desktop d-none d-lg-block">
        {isAuthenticated ? authLinks : guestLinks}
      </div>

      {/* Devices under 992px width */}
      <div className="login-register--mobile d-block d-lg-none">
        <Button onClick={handleClick} id='profileBtn' variant='none' className='outline-none'><UserIcon className='icon-large' /></Button>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  setTopicLogin: topic => dispatch(setTopicLogin(topic)),
  openModalCredentials: () => dispatch(openModalCredentials()),
  logout: () => dispatch(logout()),
  clearBookmarks: () => dispatch(clearBookmarks()),
  clearFavorites: () => dispatch(clearFavorites())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginRegisterButtons));
