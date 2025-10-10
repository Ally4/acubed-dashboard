import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrderHospitals';
import OrdersOtherList from './components/OrderOtherPlace';
import ResultForm from './components/ResultSend';
// import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Recovery from './components/login/PasswordRecovery'

import ResultsSent from './components/ResultsSent';
import UpdateWeb from './components/update-web';
import ViewResult from './components/ViewResult';
import LandingPage from './components/Landing'

//Customer Views
import Home from './components/customer/Home'
import CustomerOrders from './components/customer/CustomerOrders';
import OrderDetails from './components/customer/OrderDetails'
import CustomerFacilityDetail from './components/customer/FacilityPage'
import CustomerTestDetail from './components/customer/TestPage'
import Profile from './components/customer/Profile'
import Cart from './components/customer/Cart'

import Footer from './components/Footer'

import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-grow'>
            <Routes>
              <Route path="/users" exact element={<UsersList />} />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/password-recovery" element={<Recovery />} />
              <Route path="/" element={<LandingPage />} />

              <Route path="/view-result" exact element={<ResultsSent />} />
              <Route path="/update-web/:id" exact element={<UpdateWeb />} />

              <Route path="/result" exact element={<ResultForm />} />
              <Route path="/orders" exact element={<OrdersList />} />
              <Route path="/orders-other" exact element={<OrdersOtherList />} />
              <Route path="/view-results" element={<ViewResult />} />
              <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><CustomerOrders /></ProtectedRoute>} />
              <Route path="/order-details" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>}></Route>
              <Route path="/facility" element={<ProtectedRoute><CustomerFacilityDetail /></ProtectedRoute>} />
              <Route path="/tests" element={<ProtectedRoute><CustomerTestDetail /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

