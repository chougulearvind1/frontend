import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './Component/Home';
import Register from './Component/register';
import login from './Component/login';
import Profile from './Component/Profile';
import SideBar from './Component/Home_Component/SideBar';
import TweetReplies from './Component/TweetReplies';



function App() {
  console.log('app is called');
  return (
    <div >
        
        <div className="row">
           <div className="col-1">

           </div>
           <div className="col-2">
           <SideBar></SideBar>
           </div>
           <div className="col-8">
              <BrowserRouter>
                <Routes>
                  <Route path='/' Component={Home}></Route>
                  <Route path='/register' Component={Register} ></Route>
                  <Route path='/login' Component={login} ></Route>
                  <Route path='/profile/:userId' element={<Profile/>} ></Route>
                  <Route path='/Tweets' Component={TweetReplies}></Route>
                  

                </Routes>
                </BrowserRouter>      
                
            
           </div>
           <div className="col-1">

           </div>
            
        </div>
     
        
     
       <ToastContainer></ToastContainer>
      
    </div>
  );
}

export default App;
