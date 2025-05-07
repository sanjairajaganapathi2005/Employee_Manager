import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getISOWeek, getYear, startOfWeek, endOfWeek, format } from 'date-fns';
import styles from '../styles/weekreport.module.css';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const WeeklyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weekRange, setWeekRange] = useState('');
  const [error, setError] = useState(null);

  // Initialize week range on first render
  useEffect(() => {
    const monday = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const sunday = endOfWeek(monday, { weekStartsOn: 1 });
    setWeekRange(`${format(monday, 'MMM d')} - ${format(sunday, 'MMM d, yyyy')}`);
  }, []);

  const handleDateChange = (date) => {
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    const sunday = endOfWeek(monday, { weekStartsOn: 1 });
    setSelectedDate(monday);
    setWeekRange(`${format(monday, 'MMM d')} - ${format(sunday, 'MMM d, yyyy')}`);
  };

  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  }

  const fetchReport = async () => {
    setIsLoading(true);
    setError(null);
    const year = getYear(selectedDate);
    const week = getISOWeek(selectedDate);

    try {
      const res = await axios.get(`${VITE_API_URL}/api/weekly-report?year=${year}&week=${week}`);
      const raw = res.data;

      const summaryMap = {};
      raw.forEach(item => {
        const name = item._id.EmpName;
        const desc = item._id.description;
        const count = item.totalCount;
        const total = item.totalValue;

        if (!summaryMap[name]) {
          summaryMap[name] = { name, totalCount: 0, salary: 0 };
        }

        if (desc === "salary") {
          summaryMap[name].salary = total;
        } else {
          summaryMap[name].totalCount += count;
        }
      });

      setReportData(Object.values(summaryMap));
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report data');
      setReportData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.weeklyReportContainer}>
      <div className={styles.reportHeader}>
        <h2>Weekly Report</h2>
        <button  className={styles.logoutButton} onClick={handlelogout}>Logout</button>    
        <div className={styles.dateControls}>
          <div className={styles.datePickerContainer}>
            <label>Select Week: </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showWeekNumbers={false}  // This hides the week numbers
              showPopperArrow={false}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a Monday"
              filterDate={(date) => date.getDay() === 1}
              calendarStartDay={1}
              className={styles.datePickerInput}
            />
            {weekRange && <div className={styles.weekRange}>{weekRange}</div>}
          </div>
          <button
            onClick={fetchReport}
            className={styles.fetchButton}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Report'}
          </button>
        </div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {reportData.length > 0 ? (
        <div className={styles.reportTableContainer}>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Total Count</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.name}</td>
                  <td>{row.totalCount}</td>
                  <td>₹{(row.salary * -1).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.noDataMessage}>
          {isLoading ? 'Loading report data...' : 'No report data available. Select a week and click "Get Report".'}
        </div>
      )}
    </div>
  );
};

export default WeeklyReport;