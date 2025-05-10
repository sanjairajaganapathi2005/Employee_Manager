import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getISOWeek, getYear, startOfWeek, endOfWeek, format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/weekreport.module.css';
import { FaSignOutAlt, FaFileAlt, FaCalendarAlt, FaSearch, FaUserTie } from 'react-icons/fa';
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const WeeklyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [weekRange, setWeekRange] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  };

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

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className={styles.customHeader}>
      <button 
        onClick={decreaseMonth} 
        disabled={prevMonthButtonDisabled}
        className={styles.navButton}
      >
        &lt;
      </button>
      <div className={styles.monthTitle}>
        {format(date, 'MMMM yyyy')}
      </div>
      <button 
        onClick={increaseMonth} 
        disabled={nextMonthButtonDisabled}
        className={styles.navButton}
      >
        &gt;
      </button>
    </div>
  );

  return (
    <div className={styles.weeklyReportContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <FaFileAlt className={styles.headerIcon} />
            <h2>Weekly Production Report</h2>
          </div>
          <button className={styles.logoutButton} onClick={handlelogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.controlsCard}>
          <div className={styles.dateControls}>
            <div className={styles.datePickerContainer}>
              <label>
                <FaCalendarAlt className={styles.controlIcon} /> Select Week:
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showWeekNumbers={false}
                showPopperArrow={false}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a Monday"
                filterDate={(date) => date.getDay() === 1}
                calendarStartDay={1}
                className={styles.datePickerInput}
                renderCustomHeader={renderCustomHeader}
                popperClassName={styles.calendarPopper}
              />
              {weekRange && <div className={styles.weekRange}>{weekRange}</div>}
            </div>
            <button
              onClick={fetchReport}
              className={styles.fetchButton}
              disabled={isLoading}
            >
              <FaSearch /> {isLoading ? 'Loading...' : 'Generate Report'}
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <div className={styles.errorIcon}>⚠️</div>
            {error}
          </div>
        )}

        {reportData.length > 0 ? (
          <div className={styles.reportCard}>
            <div className={styles.reportHeader}>
              <h3>Weekly Summary</h3>
              <div className={styles.summaryStats}>
                <div className={styles.statItem}>
                  <FaUserTie className={styles.statIcon} />
                  <span>{reportData.length} Employees</span>
                </div>
                <div className={styles.statItem}>
                  <GiReceiveMoney className={styles.statIcon} />
                  <span>
                    {reportData.reduce((sum, row) => sum + row.totalCount, 0)} Total Items
                  </span>
                </div>
                <div className={styles.statItem}>
                  <GiPayMoney className={styles.statIcon} />
                  <span>
                    ₹{reportData.reduce((sum, row) => sum + (row.salary * -1), 0).toFixed(2)} Total Salary
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.reportTableContainer}>
              <table className={styles.reportTable}>
                <thead>
                  <tr>
                    <th><FaUserTie /> Employee</th>
                    <th><GiReceiveMoney /> Production</th>
                    <th><GiPayMoney /> Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>{row.totalCount}</td>
                      <td className={styles.salaryCell}>₹{(row.salary * -1).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.noDataCard}>
            <div className={styles.noDataContent}>
              <FaFileAlt className={styles.noDataIcon} />
              <h3>No Report Data Available</h3>
              <p>Select a week and click "Generate Report" to view data</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyReport;
