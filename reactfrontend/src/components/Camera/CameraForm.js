import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CameraFeed } from './Camera';


// Upload to local seaweedFS instance
const uploadImage = async file => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://127.0.0.1:5000/uploadcam', formData);

    // Connect to a seaweedfs instance
};

function CameraForm() {
    return (
        <div>
            <h1>Image capture test</h1>
            <p>Capture image from USB webcamera and upload to form</p>
            <CameraFeed sendFile={uploadImage} />
        </div>
    );
}

export default CameraForm;
