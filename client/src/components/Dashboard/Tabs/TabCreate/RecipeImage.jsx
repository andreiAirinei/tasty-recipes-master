import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import {
  setLocalImage,
  removeLocalImage
} from '../../../../redux/private/recipes/privateRecipes.actions';

// Bootstrap
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const RecipeImage = ({ imageFromLocal, setLocalImage, removeLocalImage }) => {

  const [imageFromIMGBB, setImageFromIMGBB] = useState(null);

  useEffect(() => {
    // When it's called without an argument it will look in LocalStorage for the image
    setLocalImage();

    return () => {
      localStorage.setItem('saved', 'abc1223');
    }
  }, []);

  // Handle Drag&Drop field
  const handleImageFile = e => {
    const reader = new FileReader();
    // Set event listener to 'reader'
    reader.onload = (ev) => setLocalImage(ev.target.result);

    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);

    // There is a CORS error while 'x-auth-token' is included in the Headers when trying to do a request to IMGUR API 
    // I could have used 'fetch' instead of 'axios' in order to avoid this problem, same as I have used 'fetch' for TheMealDB API
    const fetchImage = async () => {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      // Create a new AXIOS instance just for this API call in order to send a request without 'x-auth-token' in Headers
      const instance = axios.create({ timeout: 10000 });
      delete instance.defaults.headers.common['x-auth-token'];

      const res = await instance.post('https://api.imgbb.com/1/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          key: '96160400f12c723fdc5b4ab51b320251',
        }
      });

      // setImageFromIMGBB(res.data.data.medium.url);
    }
    fetchImage();
  }

  // const handleRemove = () => {
  //   setImageUploaded(null);
  //   // Attention! Image URL is added to state before the remove (async)
  //   setImageFromIMGBB(null);
  // }

  return (
    <div className='mb-3'>
      <div className="drop-panel d-flex align-items-center justify-content-center">
        {
          !imageFromLocal && <div className="drop-panel--text">
            <p className='m-0 p-0 text-center'><em>Drag &amp; Drop image</em></p>
            <p className='m-0 p-0'><em>(or click to Browse)</em></p>
          </div>
        }
        <input type="file" className='hidden-input' onChange={handleImageFile} accept="image/*" />
        <Image src={imageFromLocal} fluid rounded />
      </div>
      {
        imageFromLocal && <Button onClick={removeLocalImage} size='sm' variant='outline-secondary' className='mt-2 d-block mx-auto border-0'>Remove image</Button>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  imageFromLocal: state.privateRecipes.recipe.imageFromLocal
});

const mapDispatchToProps = dispatch => ({
  setLocalImage: img => dispatch(setLocalImage(img)),
  removeLocalImage: () => dispatch(removeLocalImage())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeImage);
