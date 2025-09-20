import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAllUsers, selectUsersStatus } from '../features/usersSlice';
import DataTable from './DataTable';

const UsersList = () => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const users = usersData?.data?.users || [];

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      cell: (user) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
          #{user?.id}
        </span>
      ),
    },
    {
      header: 'Username',
      accessor: 'user',
      cell: (user) => (
        <span className="font-medium">
          {user?.user || '-'}
        </span>
      ),
    },
    {
      header: 'First Name',
      accessor: 'firstName',
      cell: (user) => user?.firstName || '-',
    },
    {
      header: 'Last Name',
      accessor: 'lastName',
      cell: (user) => user?.lastName || '-',
    },
    {
      header: 'Email',
      accessor: 'email',
      cell: (user) => user?.email ? (
        <a
          href={`mailto:${user.email}`}
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {user.email}
        </a>
      ) : '-',
    },
    {
      header: 'City',
      accessor: 'city',
      cell: (user) => user?.city || '-',
    },
    {
      header: 'Occupation',
      accessor: 'occupation',
      cell: (user) => user?.occupation || '-',
    },
    {
      header: 'Gender',
      accessor: 'gender',
      cell: (user) => (
        <span className="capitalize text-sm">
          {user?.gender || '-'}
        </span>
      ),
    },
    {
      header: 'Address',
      accessor: 'address',
      cell: (user) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {user?.address || '-'}
        </span>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phoneNumber',
      cell: (user) => user?.phoneNumber ? (
        <a
          href={`tel:${user.phoneNumber}`}
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {user.phoneNumber}
        </a>
      ) : '-',
    },
  ];

  return (
    <div className="p-6">
      <DataTable
        title="Users Management"
        columns={columns}
        data={users}
        isLoading={status === 'loading'}
        error={status === 'failed' ? 'Unable to fetch user data. Please check your connection and try again.' : null}
        emptyMessage="No users found."
        className="mx-auto max-w-7xl"
      />
    </div>
  );
};

export default UsersList;
