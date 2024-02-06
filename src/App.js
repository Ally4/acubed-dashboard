import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrderHospitals';
import OrdersOtherList from './components/OrderOtherPlace';
import ResultForm from './components/ResultSend';

import ResultsSent from './components/ResultsSent';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
    <div>
    <Routes>
    <Route path="/" exact element={<UsersList />} />


    <Route path="/results-sent" exact element={<ResultsSent />} />

    <Route path="/result" exact element={<ResultForm />} />
    <Route path="/orders" exact element={<OrdersList />} />
    <Route path="/orders-others" exact element={<OrdersOtherList />} />
    </Routes>
    </div>
    </Router>
    </Provider>
  );
};

export default App;

