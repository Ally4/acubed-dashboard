import React, { useEffect } from "react";
import Navigation from "./Navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchOrdersHospital,
  selectAllOrders,
  selectOrdersStatus,
  selectOrdersError,
} from "../features/ordersSlice";
import { Link, useNavigate } from "react-router-dom";
import OrderStatuses from "./Enums/OrderStatuses";
import Cookies from 'js-cookie';
import { checkAuth, clearAuth } from '../utils/auth';

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
              <th>Patient Id</th>
              <th>Test Type</th>
              <th>Await Time</th>
              <th>Price</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Facility Name</th>
              <th>Phone Number</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => handleOrderClick(order)}
                style={{ cursor: 'pointer' }}
                className="order-row"
              >
                <td>{order.patient?.documentId}</td>
                <td>{order.test?.name}</td>
                <td>{order.test?.awaitTime}</td>
                <td>
                  {order.test?.currency} {order.test?.price}
                </td>
                <td>{order.name}</td>
                <td>{order.gender}</td>
                <td>{order.age}</td>
                <td>{order.healthFacility?.name}</td>
                <td>{order.contact}</td>
                <td>{order.deliveryAddress}</td>
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
