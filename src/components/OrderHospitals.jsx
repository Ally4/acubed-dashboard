import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrdersHospital,
  selectAllOrders,
  selectOrdersStatus,
  selectOrdersError,
} from "../features/ordersSlice";
import { useNavigate } from "react-router-dom";
import OrderStatuses from "./Enums/OrderStatuses";
import { checkAuth, clearAuth } from '../utils/auth';
import DataTable from './DataTable';

const OrdersHospitalsList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const auth = checkAuth();
    
    if (!auth.isAuthenticated || !auth.isFacilityAdmin) {
      console.log('Unauthorized access attempt. Redirecting to login.');
      clearAuth();
      navigate('/');
      return;
    }

    if (status === "idle") {
      dispatch(fetchOrdersHospital());
    }
  }, [dispatch, status, navigate]);

  const handleSendResults = (order) => {
    navigate(`/result?order=${order.documentId}`);
  };

  const handleViewResults = (order) => {
    navigate(`/view-results?order=${order.documentId}`);
  };

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const ordersData = orders?.data || [];

  const columns = [
    {
      header: 'Order Code',
      accessor: 'orderCode',
      cell: (order) => (
        <span className="font-mono font-medium text-primary-600 dark:text-primary-400">
          #{order.orderCode}
        </span>
      ),
    },
    {
      header: 'Patient Name',
      accessor: 'name',
      cell: (order) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">
            {order.name || '-'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {order.age ? `${order.age} yrs, ${order.gender || '-'}` : order.gender || '-'}
          </span>
        </div>
      ),
    },
    {
      header: 'Test Type',
      accessor: 'test.name',
      cell: (order) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 dark:text-white">
            {order.test?.name || '-'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {order.price ? `${order.currency || 'ETB'} ${order.price}` : '-'}
          </span>
        </div>
      ),
    },
    {
      header: 'Created',
      accessor: 'createdAt',
      cell: (order) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900 dark:text-white">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(order.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'orderStatus',
      cell: (order) => (
        <span className={`status-badge status-${order.orderStatus.toLowerCase().replace('_', '-')}`}>
          {order.orderStatus.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Actions',
      filterable: false,
      searchable: false,
      cell: (order) => (
        <div className="flex items-center space-x-2">
          <button
            className="btn btn-secondary btn-sm flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation();
              handleViewMore(order);
            }}
            title="View detailed information"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Details</span>
          </button>
          {order.orderStatus === OrderStatuses.COMPLETED ? (
            <button
              className="btn btn-primary btn-sm flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation();
                handleViewResults(order);
              }}
              title="View test results"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Results</span>
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation();
                handleSendResults(order);
              }}
              title="Send test results"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send Results</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6">
        <DataTable
          title="Hospital Orders"
          columns={columns}
          data={ordersData}
          isLoading={status === "loading"}
          error={status === "failed" ? (error || 'Unable to fetch order data. Please check your connection and try again.') : null}
          emptyMessage="There are currently no orders available."
          className="mx-auto max-w-7xl"
          pageSize={15}
        />
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              {/* Header */}
              <div className="bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order Details
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Order #{selectedOrder.orderCode}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-gray-900 px-6 py-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Patient Information */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Patient Information</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Name:</span>
                        <span className="text-blue-900 dark:text-blue-100">{selectedOrder.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Age:</span>
                        <span className="text-blue-900 dark:text-blue-100">{selectedOrder.age ? `${selectedOrder.age} years` : '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Gender:</span>
                        <span className="text-blue-900 dark:text-blue-100 capitalize">{selectedOrder.gender || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Contact:</span>
                        <span className="text-blue-900 dark:text-blue-100">
                          {selectedOrder.contact ? (
                            <a href={`tel:${selectedOrder.contact}`} className="hover:underline">
                              {selectedOrder.contact}
                            </a>
                          ) : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Email:</span>
                        <span className="text-blue-900 dark:text-blue-100">{selectedOrder.patient?.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Location:</span>
                        <span className="text-blue-900 dark:text-blue-100">{selectedOrder.isAtHospital ? 'At Hospital' : 'External'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700 dark:text-blue-300 font-medium">Delivery Address:</span>
                        <span className="text-blue-900 dark:text-blue-100">{selectedOrder.deliveryAddress || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Test Information */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-semibold text-green-900 dark:text-green-100">Test Information</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300 font-medium">Test Name:</span>
                        <span className="text-green-900 dark:text-green-100">{selectedOrder.test?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300 font-medium">Description:</span>
                        <span className="text-green-900 dark:text-green-100">{selectedOrder.test?.description || 'No description available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300 font-medium">Price:</span>
                        <span className="text-green-900 dark:text-green-100">{selectedOrder.currency || 'ETB'} {selectedOrder.price || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300 font-medium">Wait Time:</span>
                        <span className="text-green-900 dark:text-green-100">{selectedOrder.awaitTime || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300 font-medium">Status:</span>
                        <span className={`status-badge status-${selectedOrder.orderStatus.toLowerCase().replace('_', '-')}`}>
                          {selectedOrder.orderStatus.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Health Facility Information */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h4 className="font-semibold text-purple-900 dark:text-purple-100">Health Facility</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700 dark:text-purple-300 font-medium">Name:</span>
                        <span className="text-purple-900 dark:text-purple-100">{selectedOrder.healthFacility?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700 dark:text-purple-300 font-medium">Address:</span>
                        <span className="text-purple-900 dark:text-purple-100">{selectedOrder.healthFacility?.address || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700 dark:text-purple-300 font-medium">Email:</span>
                        <span className="text-purple-900 dark:text-purple-100">{selectedOrder.healthFacility?.email || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700 dark:text-purple-300 font-medium">Phone:</span>
                        <span className="text-purple-900 dark:text-purple-100">{selectedOrder.healthFacility?.phoneNumber || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Timeline */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Order Timeline</h4>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Created:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {new Date(selectedOrder.createdAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Last Updated:</span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {new Date(selectedOrder.updatedAt).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Order ID:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-mono text-xs">{selectedOrder.documentId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                {(selectedOrder.resultsImageUrl || selectedOrder.resultsPdfUrl || selectedOrder.additionalDetails) && (
                  <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100">Test Results</h4>
                    </div>
                    <div className="space-y-3">
                      {selectedOrder.resultsImageUrl && (
                        <div className="flex items-center justify-between">
                          <span className="text-orange-700 dark:text-orange-300 font-medium">Image Result:</span>
                          <a
                            href={selectedOrder.resultsImageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                          >
                            View Image
                          </a>
                        </div>
                      )}
                      {selectedOrder.resultsPdfUrl && (
                        <div className="flex items-center justify-between">
                          <span className="text-orange-700 dark:text-orange-300 font-medium">PDF Report:</span>
                          <a
                            href={selectedOrder.resultsPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary btn-sm"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                      {selectedOrder.additionalDetails && (
                        <div>
                          <span className="text-orange-700 dark:text-orange-300 font-medium block mb-2">Additional Details:</span>
                          <p className="text-orange-900 dark:text-orange-100 text-sm bg-orange-100 dark:bg-orange-900/40 p-3 rounded">
                            {selectedOrder.additionalDetails}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 flex justify-end space-x-3">
                <button
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                {selectedOrder.orderStatus === OrderStatuses.COMPLETED ? (
                  <button
                    onClick={() => {
                      closeModal();
                      handleViewResults(selectedOrder);
                    }}
                    className="btn btn-primary"
                  >
                    View Full Results
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      closeModal();
                      handleSendResults(selectedOrder);
                    }}
                    className="btn btn-primary"
                  >
                    Send Results
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersHospitalsList;
