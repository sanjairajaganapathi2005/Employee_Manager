import React, { useState } from "react";
import "./Production.css"; // Import CSS file

const Production = () => {
  const [employees, setEmployees] = useState([]); // Store employee list
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showInput, setShowInput] = useState(false); // Controls input visibility
  const [employeeName, setEmployeeName] = useState(""); // Input for new employee
  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    if (field === "count" || field === "amount") {
      const count = Number(updatedRows[index].count) || 0;
      const amount = Number(updatedRows[index].amount) || 0;
      updatedRows[index].total = updatedRows[index].description === "salary" ? -amount : count * amount;
    }

    setRows(updatedRows);
  };

  const addProduction = () => {
    setRows([...rows, { description: "", count: 0, amount: 0, total: 0 }]);
    setSavedRows([...savedRows, false]);
  };

  const addSalary = () => {
    setRows([...rows, { description: "salary", count: "-", amount: 0, total: 0 }]);
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
      setEmployeeName(""); // Clear input after adding
      setShowInput(false); // Hide input box after adding
    }
  };

  return (
    <div className="container">
      {/* Sidebar for Employee List */}
      <div className="sidebar">
        <h3 className="title">Employees</h3>
        
        {/* Show Input Box Only When "Add Employee" Button is Clicked */}
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
              ✅
            </button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className="add-button">
            + Add Employee
          </button>
        )}

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
      </div>

      {/* Employee Production Details */}
      <div className="content">
        {selectedEmployee ? (
          <>
            <h3 className="employee-header">Production Details</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Count</th>
                  <th>Amount</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
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
                {/* Grand Total Row */}
                <tr className="total-row">
                  <td colSpan="3">Grand Total:</td>
                  <td>{grandTotal}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
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
