// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       {/* <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p> */}
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//     </>
//   )
// }

// export default App


import React from 'react';
import { Switch, Route } from 'react-router-dom';


import { BrowserRouter as Router} from 'react-router-dom';
import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import Users from './components/Users';
// import Products from './components/Products';
// import Orders from './components/Orders';
// import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Switch>
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/users" component={Users} />
          {/* <Route path="/products" component={Products} /> */}
          {/* <Route path="/orders" component={Orders} /> */}
          {/* <Route path="/settings" component={Settings} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
