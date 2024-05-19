import React, { useState, useEffect } from 'react';
import '../Filter/filter.css';

function Filter() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState('');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); 
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleApply = () => {
    // Handle form submission
    const filters = {
      user: selectedUser,
      date: selectedDate,
    };
    console.log('Applied filters:', filters);
  };

  return (
    <div className="filter-container">
      <div className="filter-card">
        <select
          className="filter-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select Users</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="filter-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default Filter;
