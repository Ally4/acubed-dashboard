// import React, { useEffect } from 'react';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchOrdersHospital, selectAllOrders, selectOrdersStatus } from '../features/ordersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllOrders);
//   const status = useSelector(selectOrdersStatus);

//   console.log('the orders from hospitals ==========================', usersData)

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchOrdersHospital());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (!usersData || !usersData.data || !usersData.data.users) {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   const users = usersData.data.users;

//   return (
//     <div>
//     <Navigation />
//     <div className="users-container">
//       <h2 style={{textAlign:'center'}}>Results</h2>
//       <table className="users-table">
//         <thead>
//           <tr>
//             <th>Patient Id</th>
//             <th>Test Type</th>
//             <th>Await Time</th>
//             <th>Price</th>
//             <th>Name</th>
//             <th>Sex</th>
//             <th>Age</th>
//             <th>Facility Name</th>
//             <th>Department</th>
//             <th>Room Number</th>
//             <th>Phone Number</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user?.patientId}</td>
//               <td>{user?.testType}</td>
//               <td>{user?.awaitTime}</td>
//               <td>{user?.Price}</td>
//               <td>{user?.name}</td>
//               <td>{user?.sex}</td>
//               <td>{user?.age}</td>
//               <td>{user?.hospitalName}</td>
//               <td>{user?.department}</td>
//               <td>{user?.roomNumber}</td>
//               <td>{user?.phoneNumber}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default ResultsList;







import React, { useEffect } from 'react';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersHospital, selectAllOrders, selectOrdersStatus, selectOrdersError } from '../features/ordersSlice';

const OrdersHospitalsList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrdersHospital());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading users: {error}</div>;
  }

  if (!usersData || !usersData.data || !usersData.data.users) {
    return <div>No orders from hospitals available</div>;
  }

  const users = usersData.data.users;

  return (
    <div>
      <Navigation />
      <div className="users-container">
        <h2 style={{ textAlign: 'center' }}>Orders from hospitals</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Patient Id</th>
              <th>Test Type</th>
              <th>Await Time</th>
              <th>Price</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Facility Name</th>
              <th>Department</th>
              <th>Room Number</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.patientId}</td>
                <td>{user.testType}</td>
                <td>{user.awaitTime}</td>
                <td>{user.Price}</td>
                <td>{user.name}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
                <td>{user.facilityName}</td>
                <td>{user.department}</td>
                <td>{user.roomNumber}</td>
                <td>{user.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersHospitalsList;
