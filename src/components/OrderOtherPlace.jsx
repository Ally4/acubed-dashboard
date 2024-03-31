import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAllUsers, selectUsersStatus } from '../features/ordersOtherSlice';

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
            <th>Patient Id</th>
            <th>Test Type</th>
            <th>Await time</th>
            <th>Price</th>
            <th>Facility Name</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>City</th>
            <th>District</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user?.patientId}</td>
              <td>{user?.testType}</td>
              <td>{user?.awaitTime}</td>
              <td>{user?.Price}</td>
              <td>{user?.facilityName}</td>
              <td>{user?.nameOfThePerson}</td>
              <td>{user?.sex}</td>
              <td>{user?.age}</td>
              <td>{user?.city}</td>
              <td>{user?.district}</td>
              <td>{user?.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ResultsList;
