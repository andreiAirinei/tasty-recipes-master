import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';

// Redux
import { connect } from 'react-redux';
import { modalClose } from '../../../redux/modals/videoModal/videoModal.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import {
  selectVideoActive,
  selectVideoURL
} from '../../../redux/modals/videoModal/videoModal.selectors';

// Components
import ReactLogo from '../../../assets/close-button.svg';

// Bootstrap Components
import Modal from 'react-bootstrap/Modal';

const VideoModal = ({ isActive, videoURL, modalClose }) => {

  const handleClosingModal = () => {
    modalClose();
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isActive}
      onHide={handleClosingModal}
    >
      <Modal.Body className='video-modal-body p-0'>
        <div className="modal-close">
          <button className='modal-close-btn' onClick={handleClosingModal}>
            <img src={ReactLogo} alt="Button Close" />
          </button>
        </div>
        <YouTubePlayer
          url={videoURL}
          playing={true}
          controls
          volume={0.2}
          width='auto'
          height='500px'
        />
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = createStructuredSelector({
  isActive: selectVideoActive,
  videoURL: selectVideoURL
});

const mapDispatchToProps = dispatch => ({
  modalClose: () => dispatch(modalClose())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoModal);
