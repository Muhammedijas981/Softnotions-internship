// src/App.js
import React from 'react';
import IndividualComponent from './components/individual';
import './App.css'

const App = () => {
  const fetchData = async (position) => {
    const response = await fetch(`http://localhost:3000/individuals/${position}`);
    const data = await response.json();
    return data;
  };

  return (
    <div className='main_container'>
      <h1>Data Fetching and Display</h1>
      <IndividualComponent position="First" fetchData={fetchData} />
      <IndividualComponent position="Second" fetchData={fetchData} />
      <IndividualComponent position="Third" fetchData={fetchData} />
    </div>
  );
};

export default App;
