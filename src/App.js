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
import Home from './components/customer/dashboard/Home'
import CustomerOrders from './components/customer/orders/CustomerOrders';
import OrderDetails from './components/customer/orders/OrderDetails'
import OrderPDF from './components/customer/orders/OrderPDF'
import CustomerFacilityDetail from './components/customer/FacilityPage'
import CustomerTestDetail from './components/customer/TestPage'
import Account from './components/customer/account/Account'
import Cart from './components/customer/orders/CartPage'
import CollectionPoint from './components/customer/CollectionPoint'
import OrderConfirmation from './components/customer/orders/OrderConfirmPage'
import TestView from './components/customer/TestView'

import IdleChecker from './components/IdleChecker'

import ProtectedRoute from './components/ProtectedRoute';
import RouteLayout from './components/RouteLayout'
import RouteLayoutOpen from './components/RouteLayoutOpen'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { render } from 'react-dom';// import Sidebar from '../Sidebar'
import { createRoot } from 'react-dom/client';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-grow'>
            <Routes>
              <Route path="/users" exact element={<UsersList />} />
              <Route path="/signup" exact element={
                <RouteLayoutOpen>
                  <Signup />
                </RouteLayoutOpen>} />

              <Route path="/email-verify-account" element={
                <RouteLayoutOpen>
                  <EmailVerifyAccount />
                </RouteLayoutOpen>} />

              <Route path="/phone-verify-account" element={
                <RouteLayoutOpen>
                  <PhoneVerifyAccount />
                </RouteLayoutOpen>} />

              <Route path="/login" exact element={
                <RouteLayoutOpen>
                  <Login />
                </RouteLayoutOpen>} />

              <Route path="/phonenumber-login" exact element={
                <RouteLayoutOpen>
                  <PhoneNumberLogin />
                </RouteLayoutOpen>} />

              <Route path="/password-recovery" element={
                <RouteLayoutOpen>
                  <Recovery />
                </RouteLayoutOpen>} />

              <Route path="/password-reset" element={<Reset />} />

              <Route path="/" element={
                <RouteLayoutOpen>
                  <LandingPage />
                </RouteLayoutOpen>} />

              <Route path="/view-result" exact element={<ResultsSent />} />
              <Route path="/update-web/:id" exact element={<UpdateWeb />} />

              <Route path="/result" exact element={<ResultForm />} />
              <Route path="/orders" exact element={<OrdersList />} />
              <Route path="/orders-other" exact element={<OrdersOtherList />} />
              <Route path="/view-results" element={<ViewResult />} />

              <Route path="/dashboard/:view" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <Home />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/my-orders" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <CustomerOrders />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/order-details/:orderId" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <OrderDetails />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/order-details/:orderId/results" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <OrderPDF />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/facility/:id" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <CustomerFacilityDetail />
                    </RouteLayout>
                </IdleChecker>
              </ProtectedRoute>} />

              <Route path="/tests/:id" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <CustomerTestDetail />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/facilities/test/:test/:sampleType/:testId" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <TestView />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/cart" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <Cart />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/account" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <Account />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/collection/:facilityId/:testId/:price/:sampleType/:name/:order?" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <CollectionPoint />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

              <Route path="/order-confirm/:cart_id?" element={
                <ProtectedRoute>
                  <IdleChecker>
                    <RouteLayout>
                      <OrderConfirmation />
                    </RouteLayout>
                  </IdleChecker>
                </ProtectedRoute>} />

            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>
  );
};
// const root = createRoot(document.getElementById('root'))
// // ReactDOM.render(<OrderPDFComponent />, document.getElementById('root'));
// root.render(<App />);
export default App;

