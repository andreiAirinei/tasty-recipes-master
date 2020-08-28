import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

// Redux
import { connect } from 'react-redux';
import { closeModalCredentials } from '../../../redux/modals/credentialsModal/credentialsModal.actions';

// Components
import Login from './Login';
import Register from './Register';

// Bootstrap
import Modal from 'react-bootstrap/Modal';

const CredentialsModal = ({ isActive, topicLogin, closeModalCredentials, isAuthenticated, history }) => {

  useEffect(() => {
    if (isAuthenticated) {
      closeModalCredentials();
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  const handleClosingModal = () => {
    closeModalCredentials();
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
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  closeModalCredentials: () => dispatch(closeModalCredentials())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CredentialsModal));
