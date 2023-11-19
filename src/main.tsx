import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import store from './stores';
import AppRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppRoutes />
  </Provider>
  // </React.StrictMode>
  ,
);
