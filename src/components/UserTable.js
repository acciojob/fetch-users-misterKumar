import React, { useState, useEffect } from 'react';
import "../styles/App.css"

function UserTable() {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(false); // Track whether to show the table

  useEffect(() => {
    // Fetch user data when the showTable state becomes true
    if (showTable) {
      fetchUsers();
    }
  }, [showTable]);

  const fetchUsers = () => {
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error('Error fetching user data', error));
  };

  const handleButtonClick = () => {
    // Set showTable to true when the button is clicked
    setShowTable(true);
  };

  return (
    <div className="table-container">
      <div className="table-heading">
        <h1>Blue whales</h1>
        <button className="btn" onClick={handleButtonClick}>
          Get User List
        </button>
      </div>
      {showTable && ( // Conditionally render the table when showTable is true
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    width="50"
                    height="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserTable;
