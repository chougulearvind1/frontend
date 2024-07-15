import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Component/Home';
import Register from './Component/register';
import login from './Component/login';
import Profile from './Component/Profile';


function App() {
  return (
    <div >
     
     
       <BrowserRouter>
       <Routes>
        {/* <Route path='/' Component={Profile}></Route> */}
        <Route path='/register' Component={Register} ></Route>
        <Route path='/login' Component={login} ></Route>
        <Route path='/profile/:userId' element={<Profile/>} ></Route>
        <Route path='/profiles' Component={Home} ></Route>

       </Routes>
       </BrowserRouter>
       <ToastContainer></ToastContainer>
      
    </div>
  );
}

export default App;
