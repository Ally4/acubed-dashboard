import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAllUsers, selectUsersStatus } from '../features/usersSlice';

const ResultsList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!usersData || !usersData.data || !usersData.data.users) {
    return <div>Error loading users: {status.error}</div>;
  }

  const users = usersData.data.users;

  return (
    <div>
    <Navigation />
    <div className="users-container">
      <h2 style={{textAlign:'center'}}>Results</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Diagnosis</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user?.id}</td>
              <td>{user?.patientId}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.phoneNumber}</td>
              <td>{user?.address}</td>
              <td>{user?.diagnosis}</td>
              <td>{user?.pdf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ResultsList;
