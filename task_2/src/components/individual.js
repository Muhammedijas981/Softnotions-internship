// src/components/IndividualComponent.js
import React, { useState } from 'react';
import './individual.css'

const IndividualComponent = ({ position, fetchData }) => {
    const [individual, setIndividual] = useState(null);

    const handleFetchData = async () => {
        const data = await fetchData(position);
        setIndividual(data);
    };

    return (
        <div className='main_container'>
            <button className='btn' onClick={handleFetchData}>Fetch {position} Individual</button>
            {individual && (
                <div>
                    <h3>{individual.name}</h3>
                    <p>Age: {individual.age}</p>
                    <p>Position: {individual.position}</p>
                </div>
            )}
        </div>
    );
};

export default IndividualComponent;
