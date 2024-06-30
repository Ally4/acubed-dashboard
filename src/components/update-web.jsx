// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchUserById, updateUser } from '../features/usersSlice';

// const UpdateUser = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.users.userById[id]);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     diagnosis: '',
//     pdf: ''
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         phoneNumber: user.phoneNumber || '',
//         address: user.address || '',
//         diagnosis: user.diagnosis || '',
//         pdf: user.pdf || ''
//       });
//     } else {
//       dispatch(fetchUserById(id));
//     }
//   }, [user, id, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ id, ...formData }));
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Update User</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Diagnosis:</label>
//           <input type="text" name="diagnosis" value={formData.diagnosis} onChange={handleChange} />
//         </div>
//         <div>
//           <label>PDF:</label>
//           <input type="text" name="pdf" value={formData.pdf} onChange={handleChange} />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;






// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, updateUser } from '../features/usersSlice';

// const UpdateUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.users.userById[id]);
//   const status = useSelector(state => state.users.status);
//   const [formData, setFormData] = useState({
//     email: '',
//     address: '',
//   });

//   useEffect(() => {
//     if (!user) {
//       dispatch(fetchUserById(id));
//     } else {
//       setFormData({
//         email: user.email || '',
//         address: user.address || '',
//       });
//     }
//   }, [dispatch, id, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ id, ...formData })).then(() => {
//       navigate('/results-sent');
//     });
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Update User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//         />
//         <button type="submit">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;





// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, updateUser } from '../features/usersSlice';

// const UpdateUser = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.users.userById[id]);
//   const status = useSelector(state => state.users.status);
//   const [formData, setFormData] = useState({
//     email: '',
//     address: '',
//   });

//   useEffect(() => {
//     if (!user) {
//       dispatch(fetchUserById(id));
//     } else {
//       setFormData({
//         email: user.email || '',
//         address: user.address || '',
//       });
//     }
//   }, [dispatch, id, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (user) {
//       dispatch(updateUser({ id, ...formData })).then(() => {
//         navigate('/results-sent');
//       });
//     } else {
//       console.error('User data is not available for update.');
//     }
//   };

//   if (status === 'loading' || !user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Update User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//         />
//         <button type="submit">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;











// // update-web.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, updateUser, selectUsersStatus } from '../features/usersSlice';

// const UpdateWeb = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const status = useSelector(selectUsersStatus);
//   const user = useSelector((state) => state.users.user);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     diagnosis: '',
//     pdf: ''
//   });

//   useEffect(() => {
//     if (status === 'idle' || (user && user.id !== id)) {
//       dispatch(fetchUserById(id));
//     }
//   }, [dispatch, id, status, user]);

//   useEffect(() => {
//     if (user) {
//       setFormData(user);
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser(formData))
//       .then(() => {
//         navigate('/results-sent');
//       });
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading user: {status.error}</div>;
//   }

//   return (
//     <div>
//       <h2>Update User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//         />
//         <button type="submit">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateWeb;








// // update-web.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchUserById, updateUser, selectUsersStatus } from '../features/updateSlice';

// const UpdateWeb = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const status = useSelector(selectUsersStatus);
//   const user = useSelector((state) => state.users.user);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     diagnosis: '',
//     pdf: ''
//   });

//   useEffect(() => {
//     if (status === 'idle' || (user && user.id !== id)) {
//       dispatch(fetchUserById(id));
//     }
//   }, [dispatch, id, status, user]);

//   useEffect(() => {
//     if (user) {
//       setFormData(user);
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser(formData))
//       .unwrap()
//       .then(() => {
//         navigate('/results-sent');
//       })
//       .catch((error) => {
//         alert('Failed to update user: ' + error.message);
//       });
//   };

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error loading user: {status.error}</div>;
//   }

//   return (
//     <div>
//       <h2>Update User</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//         />
//         <button type="submit">Update User</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateWeb;









// update-web.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, updateUser, selectUsersStatus } from '../features/updateSlice';

const UpdateWeb = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectUsersStatus);
  const user = useSelector((state) => state.users.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    diagnosis: '',
    pdf: ''
  });

  useEffect(() => {
    if (status === 'idle' || (user && user.id !== id)) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id, status, user]);

  useEffect(() => {
    if (user) {
      setFormData({ ...user, id });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        navigate('/results-sent');
      })
      .catch((error) => {
        alert('Failed to update user: ' + error.message);
      });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading user: {status.error}</div>;
  }

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateWeb;

