import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Component/Home';
import Register from './Component/register';
import login from './Component/login';

function App() {
  return (
    <div >
     
       <BrowserRouter>
       <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/register' Component={Register} ></Route>
        <Route path='/login' Component={login} ></Route>
       </Routes>
       </BrowserRouter>
       <ToastContainer></ToastContainer>
      
    </div>
  );
}

export default App;
