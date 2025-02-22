import React, { useState } from "react";
import "../styles/design.css";

const Design = () => {
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [designerName, setDesignerName] = useState("");
  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    // Ensure the 'count' field is treated as a number
    if (field === "count") {
      updatedRows[index][field] = Number(value) || 0; // Convert to number or fallback to 0 if NaN
    } else {
      updatedRows[index][field] = value;
    }
    setRows(updatedRows);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const addDesign = () => {
    setRows([...rows, { date: getCurrentDate(), designColour: "", count: 0 }]);
    setSavedRows([...savedRows, false]);
  };

  const addSales = () => {
    setRows([...rows, { date: getCurrentDate(), designColour: "sales", count: 0 }]);
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

  const addDesigner = () => {
    if (designerName.trim() !== "") {
      setDesigners([...designers, { id: designers.length + 1, name: designerName }]);
      setDesignerName("");
      setShowInput(false);
    }
  };

  const totalDesignCount = rows
    .filter(row => row.designColour !== "sales")
    .reduce((total, row) => total + Number(row.count), 0) -
    rows
    .filter(row => row.designColour === "sales")
    .reduce((total, row) => total + Number(row.count), 0);

  // Function to calculate the total count for each designColour
  const calculateTotalByColour = () => {
    const colourCounts = {};

    rows.forEach(row => {
      if (row.designColour && row.count > 0) {
        colourCounts[row.designColour] = (colourCounts[row.designColour] || 0) + row.count;
      }
    });

    return colourCounts;
  };

  const colourTotals = calculateTotalByColour();

  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="title">Design List</h2>
        <div className="design-list">
          {designers.map((designer) => (
            <button
              key={designer.id}
              className={`design-item ${selectedDesigner === designer.id ? "active" : ""}`}
              onClick={() => setSelectedDesigner(designer.id)}
            >
              {designer.name}
            </button>
          ))}
        </div>
        {showInput ? (
          <div className="design-input">
            <input
              type="text"
              placeholder="Enter design name"
              value={designerName}
              onChange={(e) => setDesignerName(e.target.value)}
              className="input-box"
            />
            <button onClick={addDesigner} className="add-button">OK</button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className="add-button">+ Add Design</button>
        )}
      </div>

      <div className="content">
        {selectedDesigner ? (
          <>
            <h3 className="design-header">Design Details</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Design Colour</th>
                  <th>Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>
                      <input
                        type="text"
                        value={row.designColour}
                        className="input-box"
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "designColour", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.count || ""}
                        className="input-box"
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "count", e.target.value)}
                        step="1"
                        min="0"
                        placeholder="Enter count"
                      />
                    </td>
                    <td>
                      {!savedRows[index] ? (
                        <button className="save-button" onClick={() => saveRow(index)}>Save</button>
                      ) : (
                        <button className="edit-button" onClick={() => toggleEdit(index)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="2"><h3>Total count Split up:</h3></td>
                  <td colSpan="2"><h4>
                    {Object.keys(colourTotals).map((colour) => (
                      <div key={colour}>{colour}: {colourTotals[colour]}</div>
                    ))}</h4>
                  </td>
                </tr>
                {/* Display total count overall */}
                <tr className="total-row">
                  <td colSpan="2"><h3>Total count:</h3></td>
                  <td><h3>{totalDesignCount}</h3></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="buttons">
              <button className="add-design" onClick={addDesign}>+ Add Design</button>
              <button className="add-sales" onClick={addSales}>+ Add Sales</button>
            </div>
          </>
        ) : (
          <h3 className="select-message">Select a design to view details</h3>
        )}
      </div>
    </div>
  );
};

export default Design;
