import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import './index.css';
import Body from './layout/Body';
import reportWebVitals from './reportWebVitals';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: '/api'
      },
    ],
  }
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Body/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
