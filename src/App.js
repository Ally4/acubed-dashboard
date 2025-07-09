import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrderHospitals';
import OrdersOtherList from './components/OrderOtherPlace';
import ResultForm from './components/ResultSend';
// import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import ResultsSent from './components/ResultsSent';
import UpdateWeb from './components/update-web';
import ViewResult from './components/ViewResult';

//Customer Views
import Home from './components/customer/Home'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
    <div>
    <Routes>
    <Route path="/users" exact element={<UsersList />} />
    <Route path="/signup" exact element={<Signup />} />
    <Route path="/" exact element={<Login />} />


    <Route path="/view-result" exact element={<ResultsSent />} />
    <Route path="/update-web/:id" exact element={<UpdateWeb />} />

    <Route path="/result" exact element={<ResultForm />} />
    <Route path="/orders" exact element={<OrdersList />} />
    <Route path="/orders-other" exact element={<OrdersOtherList />} />
    <Route path="/view-results" element={<ViewResult />} />
    <Route path="/dashboard" element={<Home />} />
    </Routes>
    </div>
    </Router>
    </Provider>
  );
};

export default App;

