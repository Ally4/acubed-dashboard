import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrderHospitals';
import OrdersOtherList from './components/OrderOtherPlace';
import ResultForm from './components/ResultSend';
// import Signup from './components/signup/Signup';
//Auth
import Login from './components/login/Login';
import PhoneNumberLogin from './components/login/PhoneNumberLogin'
import Signup from './components/signup/Signup';
import EmailVerifyAccount from './components/signup/EmailVerifyAccount'
import PhoneVerifyAccount from './components/signup/PhoneVerifyAcconut'
import Recovery from './components/login/PasswordRecovery'
import Reset from './components/customer/PasswordReset'

import ResultsSent from './components/ResultsSent';
import UpdateWeb from './components/update-web';
import ViewResult from './components/ViewResult';
import LandingPage from './components/Landing'

//Customer Views
import Home from './components/customer/Home'
import CustomerOrders from './components/customer/CustomerOrders';
import OrderDetails from './components/customer/OrderDetails'
import OrderPDF from './components/customer/OrderPDF'
import CustomerFacilityDetail from './components/customer/FacilityPage'
import CustomerTestDetail from './components/customer/TestPage'
import Account from './components/customer/Account'
import Cart from './components/customer/CartPage'
import CollectionPoint from './components/customer/CollectionPoint'
import OrderConfirmation from './components/customer/OrderConfirmPage'
import Footer from './components/Footer'
import TestView from './components/customer/TestView'

import IdleChecker from './components/IdleChecker'

import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
              <Route path="/email-verify-account" element={<EmailVerifyAccount />} />
              <Route path="/phone-verify-account" element={<PhoneVerifyAccount />} />

              <Route path="/login" exact element={<Login />} />
              <Route path="/phonenumber-login" exact element={<PhoneNumberLogin />} />
              <Route path="/password-recovery" element={<Recovery />} />
              <Route path="/password-reset" element={<Reset />} />
              <Route path="/" element={<LandingPage />} />

              <Route path="/view-result" exact element={<ResultsSent />} />
              <Route path="/update-web/:id" exact element={<UpdateWeb />} />

              <Route path="/result" exact element={<ResultForm />} />
              <Route path="/orders" exact element={<OrdersList />} />
              <Route path="/orders-other" exact element={<OrdersOtherList />} />
              <Route path="/view-results" element={<ViewResult />} />

              <Route path="/dashboard/:view" element={<ProtectedRoute><IdleChecker><Home /></IdleChecker></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><IdleChecker><CustomerOrders /></IdleChecker></ProtectedRoute>} />
              <Route path="/order-details/:orderId" element={<ProtectedRoute><IdleChecker><OrderDetails /></IdleChecker></ProtectedRoute>}></Route>
              <Route path="/order-details/:orderId/results" element={<ProtectedRoute><IdleChecker><OrderPDF /></IdleChecker></ProtectedRoute>}></Route>
              <Route path="/facility/:id" element={<ProtectedRoute><IdleChecker><CustomerFacilityDetail /></IdleChecker></ProtectedRoute>} />
              <Route path="/tests/:id" element={<ProtectedRoute><IdleChecker><CustomerTestDetail /></IdleChecker></ProtectedRoute>} />
              <Route path="/facilities/test/:test" element={<ProtectedRoute><IdleChecker><TestView /></IdleChecker></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><IdleChecker><Cart /></IdleChecker></ProtectedRoute>} />
              <Route path="/account" element={<ProtectedRoute><IdleChecker><Account /></IdleChecker></ProtectedRoute>} />
              <Route path="/collection/:facilityId/:testId/:price/:sampleType/:name/:order?" element={<ProtectedRoute><IdleChecker><CollectionPoint /></IdleChecker></ProtectedRoute>} />
              <Route path="/order-confirm/:cart_id?" element={<ProtectedRoute><IdleChecker><OrderConfirmation /></IdleChecker></ProtectedRoute>} />

            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

