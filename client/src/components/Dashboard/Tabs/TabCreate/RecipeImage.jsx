import React, { useState } from 'react';
import axios from 'axios';

// Bootstrap
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const RecipeImage = () => {

  const [imageUploaded, setImageUploaded] = useState(null);
  const [imageFromIMGBB, setImageFromIMGBB] = useState(null);

  // Handle Drag&Drop field
  const handleImageFile = e => {
    const reader = new FileReader();
    reader.onload = (ev) => setImageUploaded(ev.target.result);

    e.target.files[0] && reader.readAsDataURL(e.target.files[0]);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    // There is a CORS error with 'x-auth-token' included when trying to do a request to IMGUR API 
    // I could have used 'fetch' instead of 'axios' in order to avoid this problem, same as I have used 'fetch' for TheMealDB API
    const fetchImage = async () => {
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

      setImageFromIMGBB(res.data.data.medium.url);
    }
    fetchImage();
  }

  const handleRemove = () => {
    setImageUploaded(null);
    // Attention! Image URL is added to state before the remove (async)
    setImageFromIMGBB(null);
  }

  return (
    <>
      <div className="drop-panel d-flex align-items-center justify-content-center">
        {
          !imageUploaded && <div className="drop-panel--text">
            <p className='m-0 p-0 text-center'><em>Drag &amp; Drop image here</em></p>
            <p className='m-0 p-0'><em>(or click to Browse)</em></p>
          </div>
        }
        <input type="file" className='hidden-input' onChange={handleImageFile} accept="image/*" />
        <Image src={imageUploaded} fluid rounded />
      </div>
      {
        imageUploaded && <Button onClick={handleRemove} size='sm' variant='outline-secondary' className='mt-2 d-block mx-auto border-0'>Remove image</Button>
      }
    </>
  )
}

export default RecipeImage;
