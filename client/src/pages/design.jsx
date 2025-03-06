import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/design.module.css"; 
import { useNavigate } from 'react-router-dom';
const Design = () => {
  const navigate = useNavigate();
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [designerName, setDesignerName] = useState("");
  const [rows, setRows] = useState([]);
  const [savedRows, setSavedRows] = useState([]);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchDesigners();
  }, []);

  useEffect(() => {
    if (selectedDesigner) {
      fetchDesigns(selectedDesigner);
    } else {
      setRows([]);
    }
  }, [selectedDesigner]);

  const fetchDesigners = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/designers`);
      setDesigners(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDesigns = async (designerId) => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/designs/${designerId}`);
      console.log("Fetched designs:", response.data);
      setRows(response.data);
      setSavedRows(response.data.map(() => true));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    if (field === "count") {
      updatedRows[index][field] = Number(value) || 0;
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

  const addDesign = async () => {
    const newRow = { date: getCurrentDate(), coloursales: " ", person: "", count: 0 };
    try {
      const response = await axios.post(`${VITE_API_URL}/api/designs`, { ...newRow, designerId: selectedDesigner });
      setRows([...rows, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const addSales = async () => {
    const newRow = { date: getCurrentDate(), coloursales: "sales", person: "", count: 0 };
    try {
      const response = await axios.post(`${VITE_API_URL}/api/designs`, { ...newRow, designerId: selectedDesigner });
      setRows([...rows, response.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const saveRow = async (index) => {
    const row = rows[index];
    try {
      await axios.put(`${VITE_API_URL}/api/designs/${row._id}`, row);
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

  const addDesigner = async () => {
    if (designerName.trim() !== "") {
      try {
        const response = await axios.post(`${VITE_API_URL}/api/designers`, { name: designerName });
        setDesigners([...designers, response.data]);
        setDesignerName("");
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

  const nonSalesCount = rows
    .filter((row) => row.coloursales !== "sales")
    .reduce((total, row) => total + Number(row.count), 0);

  const salesCount = rows
    .filter((row) => row.coloursales === "sales")
    .reduce((total, row) => total + Number(row.count), 0);

  const totalDesignCount = nonSalesCount - salesCount;

  const calculateTotalByColour = () => {
    const colourCounts = {};
    rows.forEach((row) => {
      if (row.coloursales && row.count > 0) {
        colourCounts[row.coloursales] = (colourCounts[row.coloursales] || 0) + row.count;
      }
    });
    return colourCounts;
  };

  const colourTotals = calculateTotalByColour();

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 className={styles.title}>Design List</h2>
        <div className={styles.designList}>
          {designers.map((designer) => (
            <button
              key={designer._id}
              className={`${styles.designItem} ${
                selectedDesigner === designer._id ? styles.active : ""
              }`}
              onClick={() => setSelectedDesigner(designer._id)}
            >
              {designer.name}
            </button>
          ))}
        </div>
        {showInput ? (
          <div className={styles.designInput}>
            <input
              type="text"
              placeholder="Enter design name"
              value={designerName}
              onChange={(e) => setDesignerName(e.target.value)}
              className={styles.inputBox}
            />
            <button onClick={addDesigner} className={styles.addButton}>
              OK
            </button>
          </div>
        ) : (
          <button onClick={() => setShowInput(true)} className={styles.addButton}>
            + Add Design
          </button>
        )}
      </div>

      <div className={styles.content}>
      <button  className={styles.logoutButton} onClick={handlelogout}>Logout</button>
        {selectedDesigner ? (
          <>
          <div className={styles.designHeader}>
            <h1>Design Details</h1>
          </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Production/Sales</th>
                  <th>Person</th>
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
                        value={row.coloursales}
                        className={styles.inputBox}
                        placeholder="Enter colour name"
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "coloursales", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={row.person}
                        placeholder="Enter designer name"
                        className={styles.inputBox}
                        disabled={savedRows[index]}
                        onChange={(e) => handleInputChange(index, "person", e.target.value)}
                      />
                    </td>
                    <td>
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
                    </td>
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
                  <td colSpan="3">
                    <h3>Total count Split up:</h3>
                  </td>
                  <td colSpan="3">
                    <h4>
                      {Object.keys(colourTotals).map((colour) => (
                        <div key={colour}>
                          {colour}: {colourTotals[colour]}
                        </div>
                      ))}
                    </h4>
                  </td>
                </tr>
                <tr className={styles.totalRow}>
                  <td colSpan="3">
                    <h3>Total count:</h3>
                  </td>
                  <td>
                    <h3>{totalDesignCount}</h3>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className={styles.buttons}>
              <button className={styles.addDesign} onClick={addDesign}>
                + Add Design
              </button>
              <button className={styles.addSales} onClick={addSales}>
                + Add Sales
              </button>
            </div>
          </>
        ) : (
          <h3 className={styles.selectMessage}>Select a design to view details</h3>
        )}
      </div>
    </div>
  );
};

export default Design;
