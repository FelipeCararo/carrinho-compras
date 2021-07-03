import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProviderContext } from './context/AppStore';

localStorage.setItem('total_price', 0);
ReactDOM.render(
  <React.StrictMode>
    <ProviderContext>
      <App />
    </ProviderContext>
  </React.StrictMode>,
  document.getElementById('root')
);
