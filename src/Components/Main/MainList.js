import React, { useState, useEffect } from 'react';
import Parse from 'parse';

const MainList = () => {
  const [users, setUsers] = useState([]);

// Parsing from Back4App is Initiated 
  useEffect(() => {
    const fetchUsers = async () => {
      const User = Parse.Object.extend('User');
      const query = new Parse.Query(User);
      try {
        const results = await query.find();
        const usersData = results.map(result => ({
          id: result.id,
          firstName: result.get('firstName'),
          lastName: result.get('lastName'),
          email: result.get('emailAddress')
        }));
        setUsers(usersData.slice(0, 2)); // Limit to first two users (Grant and JP)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <hr />
      <p>Website Credits:</p>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName} | Contact: 
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>
    </div>
  );
};

export default MainList;


