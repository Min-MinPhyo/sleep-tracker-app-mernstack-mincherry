import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepForm from './components/SleepForm';
import SleepList from './components/SleepList';

const App = () => {
  const [sleeps, setSleeps] = useState([]);
  const [daySummary, setDaySummary] = useState([]);
  const [monthSummary, setMonthSummary] = useState([]);
  const [yearSummary, setYearSummary] = useState([]);
  const [searchYear, setSearchYear] = useState('');
  const [searchMonth, setSearchMonth] = useState('');
  const [searchDay, setSearchDay] = useState('');

  const handleSearch = async () => {
    let url = 'http://localhost:5000/api/sleep';
    if (searchYear) {
      url += `/search/year/${searchYear}`;
      if (searchMonth) {
        url += `/month/${searchMonth}`;
        if (searchDay) {
          url += `/day/${searchDay}`;
        }
      }
    }

    try {
      const response = await axios.get(url);
      setSleeps(response.data);
    } catch (error) {
      console.error('Error fetching sleep data:', error);
    }
  };

  const resetSearch = () => {
    setSearchYear('');
    setSearchMonth('');
    setSearchDay('');
    fetchAllSleeps();
  };




  useEffect(() => {
    fetchAllSleeps();
    fetchDaySummary();
    fetchMonthSummary();
    fetchYearSummary();
  }, []);

  const fetchAllSleeps = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sleep');
      setSleeps(response.data);
    } catch (error) {
      console.error('Error fetching sleep data:', error);
    }
  };

  const fetchDaySummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sleep/analysis/day');
      setDaySummary(response.data);
    } catch (error) {
      console.error('Error fetching day analysis:', error);
    }
  };

  const fetchMonthSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sleep/analysis/month');
      setMonthSummary(response.data);
    } catch (error) {
      console.error('Error fetching month analysis:', error);
    }
  };

  const fetchYearSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sleep/analysis/year');
      setYearSummary(response.data);
    } catch (error) {
      console.error('Error fetching year analysis:', error);
    }
  };

  const addSleep = (newSleep) => {
    setSleeps([...sleeps, newSleep]);
  };

  return (
    <div className="App">
         <div>
        <label>
          Year:
          <input type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} />
        </label>
        <label>
          Month:
          <input type="text" value={searchMonth} onChange={(e) => setSearchMonth(e.target.value)} />
        </label>
        <label>
          Day:
          <input type="text" value={searchDay} onChange={(e) => setSearchDay(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>

      <h1>Sleep Tracker</h1>
      <SleepForm addSleep={addSleep} />
      
      <div>
        <h2>Day Sleep Analysis</h2>
        <ul>
          {daySummary.map((summary, index) => (
            <li key={index}>
              Date: {summary._id} - Total Hours: {summary.totalHours}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Month Sleep Analysis</h2>
        <ul>
          {monthSummary.map((summary, index) => (
            <li key={index}>
              Month: {summary._id} - Total Hours: {summary.totalHours}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Year Sleep Analysis</h2>
        <ul>
          {yearSummary.map((summary, index) => (
            <li key={index}>
              Year: {summary._id} - Total Hours: {summary.totalHours}
            </li>
          ))}
        </ul>
      </div>

      <h2>All Sleep Records</h2>
      <SleepList sleeps={sleeps} setSleeps={setSleeps} />
    </div>
  );
};

export default App;
