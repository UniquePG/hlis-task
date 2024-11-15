// pages/admin/users.js
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '@/components/Sidebar/Sidebar';
import UsersList from '@/components/userList/UsersList';


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); 
      console.log("usrss", response);
      setUsers(response?.data?.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex h-full">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <UsersList users={users} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
