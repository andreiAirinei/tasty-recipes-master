import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { closeModalCredentials } from '../../../redux/modals/credentialsModal/credentialsModal.actions';
import { clearErrors } from '../../../redux/auth/auth.actions';

// Components
import Login from './Login';
import Register from './Register';

// Bootstrap
import Modal from 'react-bootstrap/Modal';

const CredentialsModal = ({ isActive, topicLogin, closeModalCredentials, isAuthenticated, clearErrors }) => {

  useEffect(() => {
    if (isAuthenticated) {
      closeModalCredentials();
      clearErrors();
    }
  }, [isAuthenticated, closeModalCredentials, clearErrors]);

  const handleClosingModal = () => {
    closeModalCredentials();
    clearErrors();
  }

  return (
    <Modal
      size={topicLogin ? 'sm' : 'md'}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isActive}
      onHide={handleClosingModal}
      className='credentials-modal'
    >
      <Modal.Header closeButton className='p-4 border-0 pb-0'>
        {topicLogin ? <h4>Login</h4> : <h4>Register</h4>}
      </Modal.Header>
      <Modal.Body className='px-4 pt-0'>
        {
          topicLogin ? <Login /> : <Register />
        }
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = state => ({
  isActive: state.credentialsModal.isActive,
  topicLogin: state.credentialsModal.topicLogin,
  isAuthenticated: state.auth.isAuthenticated,
  authSuccess: state.auth.authSucces
});

const mapDispatchToProps = dispatch => ({
  closeModalCredentials: () => dispatch(closeModalCredentials()),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsModal);
