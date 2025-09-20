import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersOthers, selectAllOrders, selectOrdersStatus, selectOrdersError } from '../features/ordersOtherSlice';
import DataTable from './DataTable';

const OrderOthersList = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrdersOthers());
    }
  }, [dispatch, status]);

  const orders = ordersData?.data?.users || [];

  const columns = [
    {
      header: 'Patient ID',
      accessor: 'patientId',
      cell: (order) => (
        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
          {order.patientId || '-'}
        </span>
      ),
    },
    {
      header: 'Test Type',
      accessor: 'testType',
      cell: (order) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {order.testType || '-'}
        </span>
      ),
    },
    {
      header: 'Wait Time',
      accessor: 'awaitTime',
      cell: (order) => (
        <span className={`text-sm ${order.awaitTime ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`}>
          {order.awaitTime || '-'}
        </span>
      ),
    },
    {
      header: 'Price',
      accessor: 'Price',
      cell: (order) => (
        <span className="font-medium text-green-600 dark:text-green-400">
          {order.Price ? `$${order.Price}` : '-'}
        </span>
      ),
    },
    {
      header: 'Patient Name',
      accessor: 'name',
      cell: (order) => (
        <span className="font-medium">
          {order.name || '-'}
        </span>
      ),
    },
    {
      header: 'Gender',
      accessor: 'sex',
      cell: (order) => (
        <span className="capitalize text-sm">
          {order.sex || '-'}
        </span>
      ),
    },
    {
      header: 'Age',
      accessor: 'age',
      cell: (order) => (
        <span className="text-sm">
          {order.age ? `${order.age} yrs` : '-'}
        </span>
      ),
    },
    {
      header: 'Facility',
      accessor: 'OthersName',
      cell: (order) => (
        <span className="font-medium text-primary-500">
          {order.OthersName || '-'}
        </span>
      ),
    },
    {
      header: 'Department',
      accessor: 'department',
      cell: (order) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {order.department || '-'}
        </span>
      ),
    },
    {
      header: 'Room',
      accessor: 'roomNumber',
      cell: (order) => (
        <span className="text-sm font-mono">
          {order.roomNumber || '-'}
        </span>
      ),
    },
    {
      header: 'Phone',
      accessor: 'phoneNumber',
      cell: (order) => order.phoneNumber ? (
        <a
          href={`tel:${order.phoneNumber}`}
          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
        >
          {order.phoneNumber}
        </a>
      ) : '-',
    },
  ];

  return (
    <div className="p-6">
      <DataTable
        title="External Facility Orders"
        columns={columns}
        data={orders}
        isLoading={status === 'loading'}
        error={status === 'failed' ? (error || 'Unable to fetch order data. Please check your connection and try again.') : null}
        emptyMessage="There are currently no orders from external facilities."
        className="mx-auto max-w-7xl"
      />
    </div>
  );
};

export default OrderOthersList;
