import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./DepreciationTable.css";

const DepreciationTable = () => {
  const [depreciations, setDepreciations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDepreciations();
  }, []);

  const fetchDepreciations = async () => {
    try {
      const response = await axios.get("http://localhost/backend/api/depreciation/read.php");
      setDepreciations(response.data);
    } catch (error) {
      console.error("Error fetching depreciations", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost/backend/api/depreciation/delete.php", { id });
      fetchDepreciations();
    } catch (error) {
      console.error("Error deleting depreciation", error);
    }
  };

  const filteredDepreciations = depreciations.filter(depreciation =>
    depreciation.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="depreciation-table-container">
      <h2>Depreciation List</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Period (Month)</th>
            <th>Category</th>
            <th>Asset Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepreciations.map((depreciation) => (
            <tr key={depreciation.id}>
              <td>{depreciation.name}</td>
              <td>{depreciation.cost}</td>
              <td>{depreciation.period}</td>
              <td>{depreciation.category}</td>
              <td>{depreciation.assetValue}</td>
              <td>
                <button className="button" onClick={() => handleEdit(depreciation.id)}>Edit</button>
                <button className="button" onClick={() => handleDelete(depreciation.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepreciationTable;
