import React, { useState } from "react";
import "./Production.css"; // Import CSS file

const EmployeeProduction = () => {
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

  return (
    <div className="container">
      <div className="sidebar">
        <h3>Employees</h3>
        {Array.from({ length: 5 }).map((_, index) => (
          <button key={index}>Employee {index + 1}</button>
        ))}
      </div>
      <div className="table-container">
        <table>
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
                    disabled={savedRows[index]}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                  />
                </td>
                <td>
                  {row.description !== "salary" ? (
                    <input
                      type="number"
                      value={row.count}
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
                    disabled={savedRows[index]}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                  />
                </td>
                <td>{row.total}</td>
                <td>
                  {!savedRows[index] ? (
                    <button className="save" onClick={() => saveRow(index)}>Save</button>
                  ) : (
                    <button className="edit" onClick={() => toggleEdit(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-right">Grand Total:</td>
              <td>{grandTotal}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <button className="add-production" onClick={addProduction}>+ Add Production</button>
          <button className="add-salary" onClick={addSalary}>+ Add Salary</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProduction;
