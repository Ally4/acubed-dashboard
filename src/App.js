import React from 'react';
import UsersList from './components/UsersList';
import OrdersList from './components/OrderHospitals';
import OrdersOtherList from './components/OrderOtherPlace';
import ResultForm from './components/ResultSend';
import Login from './components/login/Login';
import ResultsSent from './components/ResultsSent';
import UpdateWeb from './components/update-web';
import ViewResult from './components/ViewResult';
import Layout from './components/Layout';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/users" element={
                <Layout>
                  <UsersList />
                </Layout>
              } />
              <Route path="/orders" element={
                <Layout>
                  <OrdersList />
                </Layout>
              } />
              <Route path="/orders-other" element={
                <Layout>
                  <OrdersOtherList />
                </Layout>
              } />
              <Route path="/result" element={
                <Layout>
                  <ResultForm />
                </Layout>
              } />
              <Route path="/view-result" element={
                <Layout>
                  <ResultsSent />
                </Layout>
              } />
              <Route path="/view-results" element={
                <Layout>
                  <ViewResult />
                </Layout>
              } />
              <Route path="/update-web/:id" element={
                <Layout>
                  <UpdateWeb />
                </Layout>
              } />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

