// FormComponent.jsx
import React, { useState } from 'react';
import './App.css'
const FormComponent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('beginner');
  const [gender, setGender] = useState([]);

  const handleGenderChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setGender([...gender, value]);
    } else {
      setGender(gender.filter((item) => item !== value));
    }
  };

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://localhost:3001/generateExcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, level, gender }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to the backend');
      }

      // Convert the response data to a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a new 'a' element and set its href to the Blob's URL
      const a = document.createElement('a');
      a.href = url;

      // Set the 'download' attribute of the 'a' element to the desired file name
      a.download = 'UserData.xlsx';

      // Append the 'a' element to the body of the document
      document.body.appendChild(a);

      // Programmatically click the 'a' element to start the file download
      a.click();

      // Remove the 'a' element from the document body
      document.body.removeChild(a);

      console.log('Data sent to the backend successfully');
    } catch (error) {
      console.error('Error sending data to the backend:', error.message);
    }
  };


  const handleSubmit = () => {
    sendDataToBackend();
  };

  return (
    <div className='main_container'>
      <div className='form_container'>
        <form className='form'>
          <div className='input'>
            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='input'>
            <input type="text" placeholder='Enter your age' value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className='radio_btn'>
            <div>
              <input type="radio" value="Beginner" checked={level === 'Beginner'} onChange={(e) => setLevel(e.target.value)} /> Beginner
              <input type="radio" value="Intermediate" checked={level === 'Intermediate'} onChange={(e) => setLevel(e.target.value)} /> Intermediate
              <input type="radio" value="Advanced" checked={level === 'Advanced'} onChange={(e) => setLevel(e.target.value)} /> Advanced
            </div>
          </div>
          <div className='selection_box'>
            <label>Gender:</label>
            <div>
              <input type="checkbox" value="male" onChange={handleGenderChange} /> Male
              <input type="checkbox" value="female" onChange={handleGenderChange} /> Female
            </div>
          </div>
          <div className='sumit-btn'>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
