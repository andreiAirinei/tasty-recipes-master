import React, { useState } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import {
  setLocalImage,
  setImgbbImage,
  removeImage
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Bootstrap
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const RecipeImage = ({ localImage, setLocalImage, setImgbbImage, removeImage }) => {

  // Handle Drag&Drop field
  const handleImageFile = e => {
    const reader = new FileReader();
    // Set event listener to 'reader'
    reader.onload = (ev) => setLocalImage(ev.target.result);

    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);

    setImgbbImage(e.target.files[0]);
  }

  return (
    <div className='mb-3'>
      <div className="drop-panel d-flex align-items-center justify-content-center">
        {
          !localImage && <div className="drop-panel--text">
            <p className='m-0 p-0 text-center'><em>Drag &amp; Drop image</em></p>
            <p className='m-0 p-0'><em>(or click to Browse)</em></p>
          </div>
        }
        <input type="file" className='hidden-input' onChange={handleImageFile} accept="image/*" />
        <Image src={localImage} fluid rounded />
      </div>
      {
        localImage && <Button onClick={removeImage} type="button" size='sm' variant='outline-secondary' className='mt-2 d-block mx-auto border-0'>Remove image</Button>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  localImage: state.privateRecipes.recipe.localImage
});

const mapDispatchToProps = dispatch => ({
  setLocalImage: img => dispatch(setLocalImage(img)),
  setImgbbImage: img => dispatch(setImgbbImage(img)),
  removeImage: () => dispatch(removeImage())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeImage);
