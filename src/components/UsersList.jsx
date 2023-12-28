import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectAllPosts, selectPostsStatus } from '../features/usersSlices';

const PostList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllPosts);
  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed' || !usersData || !usersData.data || !usersData.data.users) {
    return <div>Error loading users: {status.error}</div>;
  }

  const users = usersData.data.users;

  return (
    <div className="post-container">
      <h2 style={{textAlign:'center'}}>Users List</h2>
      <table className="post-table">
        <thead>
          <tr>
          <th>ID</th>
            <th>User</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Occupation</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
                            <td>{user?.id}</td>
              <td>{user?.user}</td>
              <td>{user?.firstName}</td>
              <td>{user?.lastName || 'N/A'}</td>
              <td>{user?.email}</td>
              <td>{user?.city}</td>
              <td>{user?.occupation}</td>
              <td>{user?.gender}</td>
              <td>{user?.address}</td>
              <td>{user?.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
