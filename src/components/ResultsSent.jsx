// import React, { useEffect, useState } from 'react';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser, updateUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   if (!usersData || !usersData.data || !usersData.data.users) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users;

//   const filteredUsers = users.filter(user => 
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     console.log('Update user with ID:', id);
//     dispatch(updateUser(id)); 
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>
        
//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />
        
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                     // style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Update
//                   </button>
//                   <button 
//                   onClick={() => handleDelete(user.id)}
//                   style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;









// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);
//   const history = useHistory();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   if (!usersData || !usersData.data || !usersData.data.users) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users;

//   const filteredUsers = users.filter(user =>
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     history.push(`/update/${id}`);
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>

//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(user.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   if (!usersData || !usersData.data || !usersData.data.users) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users;

//   const filteredUsers = users.filter(user =>
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-web/${id}`);
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>

//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(user.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users</div>;
//   }

//   if (!usersData || !usersData.data || !Array.isArray(usersData.data.users)) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users;

//   const filteredUsers = users.filter(user =>
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-web/${id}`);
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>

//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(user.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   if (!usersData || !usersData.data || !Array.isArray(usersData.data.users)) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users;

//   const filteredUsers = users.filter(user =>
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-web/${id}`);
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>

//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(user.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;









// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navigation from './Navigation';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

// const ResultsList = () => {
//   const dispatch = useDispatch();
//   const usersData = useSelector(selectAllUsers);
//   const status = useSelector(selectUsersStatus);
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, status]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading users: {status.error}</div>;
//   }

//   if (!usersData || !usersData.data || !Array.isArray(usersData.data.users)) {
//     console.error('User data structure is not as expected:', usersData);
//     return <div>No users available</div>;
//   }

//   const users = usersData.data.users || [];  // Default to empty array if undefined

//   const filteredUsers = users.filter(user =>
//     (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//     (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUser(id));
//   };

//   const handleUpdate = (id) => {
//     navigate(`/update-web/${id}`);
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className="users-container">
//         <h2 style={{ textAlign: 'center' }}>Results</h2>

//         <input
//           type="text"
//           placeholder="Search by name or email"
//           value={searchQuery}
//           onChange={handleSearch}
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         />

//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Patient Id</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Address</th>
//               <th>Diagnosis</th>
//               <th>File</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>{user?.id}</td>
//                 <td>{user?.patientId}</td>
//                 <td>{user?.name}</td>
//                 <td>{user?.email}</td>
//                 <td>{user?.phoneNumber}</td>
//                 <td>{user?.address}</td>
//                 <td>{user?.diagnosis}</td>
//                 <td>{user?.pdf}</td>
//                 <td>
//                   <button 
//                     onClick={() => handleUpdate(user.id)}
//                   >
//                     Update
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(user.id)}
//                     style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               disabled={index + 1 === currentPage}
//               style={{
//                 padding: '10px',
//                 margin: '5px',
//                 backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
//                 cursor: 'pointer',
//                 border: '1px solid #ccc'
//               }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsList;










import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser } from '../features/usersSlice';

const ResultsList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading users: {status.error}</div>;
  }

  console.log('usersData:', usersData);

  if (!usersData || !usersData.data || !Array.isArray(usersData.data.users)) {
    console.error('User data structure is not as expected:', usersData);
    return <div>No users available</div>;
  }

  const users = usersData.data.users || []; // Default to empty array if undefined

  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      alert(`User with ID ${id} has been deleted.`);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-web/${id}`);
  };

  return (
    <div>
      <Navigation />
      <div className="users-container">
        <h2 style={{ textAlign: 'center' }}>Results</h2>

        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
        />

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.patientId}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.address}</td>
                <td>{user?.diagnosis}</td>
                <td>{user?.pdf}</td>
                <td>
                  <button 
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
              style={{
                padding: '10px',
                margin: '5px',
                backgroundColor: index + 1 === currentPage ? 'lightblue' : 'white',
                cursor: 'pointer',
                border: '1px solid #ccc'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
