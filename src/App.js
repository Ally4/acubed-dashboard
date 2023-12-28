// App.js

import React from 'react';
import Navbar from './components/Navigation';
import Display from './components/PostList'
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <Navbar />
      <Display />
    </div>
    </Provider>
  );
};

export default App;
