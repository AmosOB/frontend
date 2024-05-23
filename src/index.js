import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './component/Auth/PrivateRoutes';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Cart from './component/Cart';


axios.defaults.baseURL = 'http://127.0.0.1:8000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/login' element = {<Login />}/>
        <Route path='/register' element = {<Register />}/>
        <Route path='/' element = {<App />}/>
        <Route path='/cart' element = {<Cart />}/>

        <Route element = {<PrivateRoutes />}>
        </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
