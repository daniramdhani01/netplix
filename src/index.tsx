import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "fontawesome-4.7/css/font-awesome.min.css";
import AppRoutes from './routing/AppRoutes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   <AppRoutes/>
  </React.StrictMode>
);