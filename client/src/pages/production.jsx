import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/production.module.css';  
import { useNavigate } from 'react-router-dom';

const Production = () => {
  const navigate=useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);
  const [showLast5, setShowLast5] = useState(false);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      fetchProductions(selectedEmployee);
    }
  }, [selectedEmployee]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/employees`);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProductions = async (employeeId) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/productions/${employeeId}`);
      setRows(response.data);
      setSavedRows(response.data.map(() => true));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];

    if (field === "count" || field === "amount") {
      value = value.replace(/\D/g, "");
      updatedRows[index][field] = value || "";
    } else {
      updatedRows[index][field] = value;
    }

    if (field === "count" || field === "amount") {
      const count = Number(updatedRows[index].count) || 0;
      const amount = Number(updatedRows[index].amount) || 0;
      updatedRows[index].total = updatedRows[index].description === "salary" ? -amount : count * amount;
    }

    setRows(updatedRows);
  };

  const getCurrentDateTime = () => {
    return new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const addProduction = () => {
    const newRow = { timestamp: getCurrentDateTime(), description: "", count: 0, amount: 0, total: 0 };
    setRows([...rows, newRow]);
    setSavedRows([...savedRows, false]);
  };

  const addSalary = () => {
    const newRow = { timestamp: getCurrentDateTime(), description: "salary", count: 0, amount: 0, total: 0 };
    setRows([...rows, newRow]);
    setSavedRows([...savedRows, false]);
  };

  const saveRow = async (index) => {
    const row = rows[index];
    try {
      if (row._id) {
        await axios.put(`${VITE_API_URL}/api/productions/${row._id}`, row);
      } else {
        const response = await axios.post(`${VITE_API_URL}/api/productions`, { ...row, employeeId: selectedEmployee });
        const updatedRows = [...rows];
        updatedRows[index] = response.data;
        setRows(updatedRows);
      }
      const updatedSavedRows = [...savedRows];
      updatedSavedRows[index] = true;
      setSavedRows(updatedSavedRows);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEdit = (index) => {
    const updatedSavedRows = [...savedRows];
    updatedSavedRows[index] = false;
    setSavedRows(updatedSavedRows);
  };

  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

  const addEmployee = async () => {
    if (employeeName.trim() !== "") {
      try {
        const response = await axios.post(`${VITE_API_URL}/api/employees`, { name: employeeName });
        setEmployees([...employees, response.data]);
        setEmployeeName("");
        setShowInput(false);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handlelogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Employees</h2>
        <div className={styles.employeeList}>
          {employees.map((employee) => (
            <button
              key={employee._id}
              className={`${styles.employeeItem} ${selectedEmployee === employee._id ? styles.active : ""}`}
              onClick={() => setSelectedEmployee(employee._id)}
            >
              {employee.name}
            </button>
          ))}
        </div>
        {showInput ? (
          <div className={styles.employeeInput}>
            <input
              type="text"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className={styles.inputBox}
            />
            <button onClick={addEmployee} className={styles.addButton}>
              Add
            </button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className={styles.addButton}>
            + Add Employee
          </button>
        )}
      </div>

      <div className={styles.content}>
      <button  className={styles.logoutButton} onClick={handlelogout}>Logout</button>
        {selectedEmployee ? (
          <>
          <div className={styles.employeeHeader}>
            <h1>Employee Details</h1>
          </div>
            <table className={styles.table}>
              <thead styles={styles.thead}>
                <tr>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Count</th>
                  <th>Amount</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(-(showLast5 ? 5 : 15)).map((row, index) => (
                  <tr key={index}>
                    <td>{row.timestamp}</td>
                    <td>
                      <input
                        type="text"
                        value={row.description}
                        className={styles.inputBox}
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      />
                    </td>
                    <td>
                      {row.description !== "salary" ? (
                        <input
                          type="number"
                          value={row.count || ""}
                          className={styles.inputBox}
                          disabled={savedRows[index]}
                          onChange={(e) => handleInputChange(index, "count", e.target.value)}
                          step="1"
                          min="0"
                          placeholder="Enter count"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.amount || ""}
                        className={styles.inputBox}
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                        step="1"
                        min="0"
                        placeholder="Enter amount"
                      />
                    </td>

                    <td>{row.total}</td>
                    <td>
                      {!savedRows[index] ? (
                        <button className={styles.saveButton} onClick={() => saveRow(index)}>
                          Save
                        </button>
                      ) : (
                        <button className={styles.editButton} onClick={() => toggleEdit(index)}>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className={styles.totalRow}>
                  <td colSpan="4"><h3>Grand Total:</h3></td>
                  <td><h3>{grandTotal}</h3></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            {/* Toggle Button */}
            <button onClick={() => setShowLast5(!showLast5)} className={styles.toggleButton}>
              {showLast5 ? "Show Last 15 Rows" : "Show Last 5 Rows"}
            </button>

            {/* Row Count Display */}
            <p className={styles.rowCount}>Showing last {showLast5 ? 5 : 15} rows</p>

            <div className={styles.buttons}>
              <button className={styles.addProduction} onClick={addProduction}>
                + Add Production
              </button>
              <button className={styles.addSalary} onClick={addSalary}>
                + Add Salary
              </button>
            </div>
          </>
        ) : (
          <h1 className={styles.selectMessage}>Select an employee to view details</h1>
        )}
      </div>
    </div>
  );
};

export default Production;
