import React, { useEffect } from "react";
import Navigation from "./Navigation";
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
import '../style/OrderHospitals.css';

const OrdersHospitalsList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const status = useSelector(selectOrdersStatus);
  const error = useSelector(selectOrdersError);
  const navigate = useNavigate();

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

  const handleOrderClick = (order) => {
    if (order.orderStatus === OrderStatuses.COMPLETED) {
      navigate(`/view-results?order=${order.documentId}`);
    } else {
      navigate(`/result?order=${order.documentId}`);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading users: {error}</div>;
  }

  if (!orders || !orders.data) {
    return <div>No orders available</div>;
  }

  return (
    <div>
      <Navigation />
      <div className="users-container">
        <h2 style={{ textAlign: "center" }}>Orders</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Order Code</th>
              <th>Patient Id</th>
              <th>Test Type</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Delivery Address</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order, index) => (
              <tr 
                key={order.id} 
                onClick={() => handleOrderClick(order)}
                style={{ cursor: 'pointer' }}
                className="order-row"
              >
                <td>{index + 1}</td>
                <td>#{order.orderCode}</td>
                <td>{order.patient?.documentId}</td>
                <td>{order.test?.name}</td>
                <td>{order.name}</td>
                <td>{order.gender}</td>
                <td>{order.age}</td>
                <td>{order.contact}</td>
                <td>{order.deliveryAddress}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
                <td>
                  <span className={`status-${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <button 
                    className={order.orderStatus === OrderStatuses.COMPLETED ? 'view-button' : 'send-button'}
                  >
                    {order.orderStatus === OrderStatuses.COMPLETED ? 'View Results' : 'Send Results'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersHospitalsList;
