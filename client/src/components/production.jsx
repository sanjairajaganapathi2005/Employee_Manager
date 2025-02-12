import React, { useState } from "react";

const EmployeeProduction = () => {
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which row is being edited

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
  };

  const addSalary = () => {
    setRows([...rows, { description: "salary", count: "-", amount: 0, total: 0 }]);
  };

  const toggleEdit = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };

  const grandTotal = rows.reduce((sum, row) => sum + row.total, 0);

  return (
    <div className="flex p-4 border rounded-lg shadow-lg w-3/4 mx-auto mt-5">
      <div className="w-1/4 border-r p-4">
        <h3 className="font-bold mb-2">Employees</h3>
        {Array.from({ length: 5 }).map((_, index) => (
          <button key={index} className="block w-full bg-blue-500 text-white rounded p-2 my-1">
            Employee {index + 1}
          </button>
        ))}
      </div>
      <div className="w-3/4 p-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Description</th>
              <th className="border p-2">Count</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border">
                <td className="border p-2">
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={row.description}
                      className="w-full p-1 border rounded"
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    />
                  ) : (
                    row.description
                  )}
                </td>
                <td className="border p-2">
                  {row.description !== "salary" ? (
                    editIndex === index ? (
                      <input
                        type="number"
                        value={row.count}
                        className="w-full p-1 border rounded"
                        onChange={(e) => handleInputChange(index, "count", e.target.value)}
                      />
                    ) : (
                      row.count
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border p-2">
                  {editIndex === index ? (
                    <input
                      type="number"
                      value={row.amount}
                      className="w-full p-1 border rounded"
                      onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    />
                  ) : (
                    row.amount
                  )}
                </td>
                <td className="border p-2">{row.total}</td>
                <td className="border p-2">
                  <button
                    className={`p-2 rounded ${editIndex === index ? "bg-green-500" : "bg-blue-500"} text-white`}
                    onClick={() => toggleEdit(index)}
                  >
                    {editIndex === index ? "Save" : "Edit"}
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-300 font-bold">
              <td className="border p-2 text-right" colSpan="3">
                Grand Total:
              </td>
              <td className="border p-2">{grandTotal}</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={addProduction}>
            + Add Production
          </button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={addSalary}>
            + Add Salary
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProduction;
