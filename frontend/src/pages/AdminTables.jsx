import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Use environment variable

const AdminTables = () => {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/tables`)
      .then(response => setTables(response.data))
      .catch(error => console.error("Error fetching tables:", error));
  }, []);

  const createTable = () => {
    if (!tableName.trim()) return alert("Table name cannot be empty");

    const tableId = `Table${tables.length + 1}`;
    axios.post(`${API_URL}/api/tables`, { tableId, name: tableName })
      .then(response => {
        setTables([...tables, response.data]); // Update state with new table
        setTableName(""); // Reset input field
      })
      .catch(error => console.error("Error creating table:", error));
  };

  return (
    <div>
      <h1>Manage Tables</h1>
      <input
        type="text"
        placeholder="Enter table name"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />
      <button onClick={createTable}>Create Table</button>

      <h2>Existing Tables</h2>
      {tables.length === 0 ? <p>No tables created yet.</p> : (
        <ul>
          {tables.map(table => (
            <li key={table.tableId}>
              <strong>{table.name}</strong> (ID: {table.tableId})
              <br />
              <img src={table.qrCode} alt={`QR for ${table.name}`} width="100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminTables;
