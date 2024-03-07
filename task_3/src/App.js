// Import necessary modules
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import './App.css';

// Define the main App component
export default function App() {
  // Define state variables for the file and name
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  // Define a handler for file changes
  const onFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    // Check if the uploaded file is an image
    if (!uploadedFile.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    setFile(uploadedFile);
  };

  // Define a handler for name changes
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  // Define a handler for form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    window.open(response.data.url, '_blank');
  };

  // Define a styled component for the file input
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <div className='main_container'>
      <p>CONVERT YOUR IMAGE TO PDF</p>
      <div className="input_container">
        <div className="choosefile">
          {/* Attach the onFileChange handler to the file input */}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={onFileChange} />
          </Button>
        </div>
        <div className='inputbox'>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            {/* Bind the name state variable to the text field */}
            {/* Attach the onNameChange handler to the text field */}
            <TextField id="outlined-basic" label="Enter the pdf name" variant="outlined" value={name} onChange={onNameChange} />
          </Box>
        </div>
        <div className='submit_btn'>
          {/* Attach the onSubmit handler to the submit button */}
          <Button variant="contained" type="submit" onClick={onSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
