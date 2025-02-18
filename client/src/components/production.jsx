import React, { useState } from "react";
import "./production.css";

const Production = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);
  const [showLast20, setShowLast20] = useState(false); // State to toggle 10 or 20 rows

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];

    if (field === "count" || field === "amount") {
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
      updatedRows[index][field] = value ? parseInt(value, 10) : 0;
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
    setRows([...rows, { timestamp: getCurrentDateTime(), description: "", count: 0, amount: 0, total: 0 }]);
    setSavedRows([...savedRows, false]);
  };
  
  const addSalary = () => {
    setRows([...rows, { timestamp: getCurrentDateTime(), description: "salary", count: "-", amount: 0, total: 0 }]);
    setSavedRows([...savedRows, false]);
  };
  
  const saveRow = (index) => {
    const updatedSavedRows = [...savedRows];
    updatedSavedRows[index] = true;
    setSavedRows(updatedSavedRows);
  };

  const toggleEdit = (index) => {
    const updatedSavedRows = [...savedRows];
    updatedSavedRows[index] = false;
    setSavedRows(updatedSavedRows);
  };

  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

  const addEmployee = () => {
    if (employeeName.trim() !== "") {
      setEmployees([...employees, { id: employees.length + 1, name: employeeName }]);
      setEmployeeName("");
      setShowInput(false);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="title">Employees</h2>

        <div className="employee-list">
          {employees.map((employee) => (
            <button
              key={employee.id}
              className={`employee-item ${selectedEmployee === employee.id ? "active" : ""}`}
              onClick={() => setSelectedEmployee(employee.id)}
            >
              {employee.name}
            </button>
          ))}
        </div>
        {showInput ? (
          <div className="employee-input">
            <input
              type="text"
              placeholder="Enter employee name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="input-box"
            />
            <button onClick={addEmployee} className="add-button">
              ok
            </button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className="add-button">
            + Add Employee
          </button>
        )}
      </div>

      <div className="content">
        {selectedEmployee ? (
          <>
            <h3 className="employee-header">Production Details</h3>

              <table className="table">
              <thead>
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
                {rows.slice(- (showLast20 ? 20 : 10)).map((row, index) => (
                  <tr key={index}>
                    <td>{row.timestamp}</td>
                    <td>
                      <input
                        type="text"
                        value={row.description}
                        className="input-box"
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      />
                    </td>
                    <td>
                      {row.description !== "salary" ? (
                        <input
                          type="number"
                          value={row.count}
                          className="input-box"
                          disabled={savedRows[index]}
                          onChange={(e) => handleInputChange(index, "count", e.target.value)}
                          step="1"
                          min="0"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.amount}
                        className="input-box"
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                        step="1"
                        min="0"
                      />
                    </td>
                    <td>{row.total}</td>
                    <td>
                      {!savedRows[index] ? (
                        <button className="save-button" onClick={() => saveRow(index)}>
                          Save
                        </button>
                      ) : (
                        <button className="edit-button" onClick={() => toggleEdit(index)}>
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="4">Grand Total:</td>
                  <td>{grandTotal}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
             {/* Toggle Button */}
             <button onClick={() => setShowLast20(!showLast20)} className="toggle-button">
                {showLast20 ? "Show Last 10 Rows" : "Show Last 20 Rows"}
              </button>

              {/* Row Count Display */}
              <p className="row-count">Showing last {showLast20 ? 20 : 10} rows</p>


            <div className="buttons">
              <button className="add-production" onClick={addProduction}>
                + Add Production
              </button>
              <button className="add-salary" onClick={addSalary}>
                + Add Salary
              </button>
            </div>
          </>
        ) : (
          <h3 className="select-message">Select an employee to view details</h3>
        )}
      </div>
    </div>
  );
};

export default Production;
