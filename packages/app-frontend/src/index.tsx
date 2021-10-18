import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';

import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/index.scss';

import reportWebVitals from './reportWebVitals';
import App from "./App";

Amplify.configure({
  Auth: {
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    region: process.env.REACT_APP_REGION,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
  },
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
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
