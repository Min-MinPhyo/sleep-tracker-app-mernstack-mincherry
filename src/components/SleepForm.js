import React, { useState } from 'react';
import axios from 'axios';

const SleepForm = ({ addSleep }) => {
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/sleep', { date, hours })
      .then(response => {
        addSleep(response.data);
        setDate('');
        setHours('');
      })
      .catch(error => console.error('Error adding sleep record:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </label>
      <label>
        Hours of Sleep:
        <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} required />
      </label>
      <button type="submit">Add Sleep</button>
    </form>
  );
};

export default SleepForm;
