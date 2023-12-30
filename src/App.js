import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrdersList';
import ResultForm from './components/ResultSend';
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
    <Route path="/result" element={<ResultForm />} />
    <Route path="/orders" element={<OrdersList />} />
    </Routes>
    </div>
    </Router>
    </Provider>
  );
};

export default App;
