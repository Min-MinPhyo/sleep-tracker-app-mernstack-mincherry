import React, { useState } from 'react';
import axios from 'axios';


const SleepList = ({ sleeps,setSleeps }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sleep/${id}`);
      setSleeps(sleeps.filter(sleep=> sleep._id != id))
      
    } catch (error) {
      console.error('Error deleting sleep record:', error);
    }
  };

  return (
    <div>
    
      <ul>
        {sleeps.map(sleep => (
          <li key={sleep._id}>
            {sleep.date}: {sleep.hours} hours
            <button onClick={() => handleDelete(sleep._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SleepList;
