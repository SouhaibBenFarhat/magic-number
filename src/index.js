import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyle } from '@react95/core';
import './styles/index.css';
import App from './app/App';

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
);
