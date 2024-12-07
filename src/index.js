import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: importing from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot instead of render

root.render(
  <Router>
    <App />
  </Router>
);
