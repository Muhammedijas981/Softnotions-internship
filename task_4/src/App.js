// FormComponent.jsx
import React, { useState } from 'react';

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

      console.log('Data sent to the backend successfully');
    } catch (error) {
      console.error('Error sending data to the backend:', error.message);
    }
  };

  const handleSubmit = () => {
    sendDataToBackend();
  };

  return (
    <div>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

        <label>Level:</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Gender:</label>
        <div>
          <input type="checkbox" value="male" onChange={handleGenderChange} /> Male
          <input type="checkbox" value="female" onChange={handleGenderChange} /> Female
        </div>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
