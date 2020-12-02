import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import ProviderSearch from './ProviderSearch';
import ProtectedRoute from './ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import axios from "axios";
import Register from './Register';

// Add a request interceptor
axios.interceptors.request.use(
   config => {
       const token = localStorage.getItem('token');
       if (token) {
           config.headers['Authorization'] = 'Bearer ' + token;
       }
       config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });

ReactDOM.render((
  <Container>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute exact={false} path="/" component={ProviderSearch} />
      </Switch>
    </BrowserRouter>
  </Container>
), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
