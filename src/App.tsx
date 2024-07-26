import React, { useEffect } from 'react';
import './App.css';
import SideBar from './Component/Home_Component/SideBar';
import { Link, Route, Routes } from 'react-router-dom';
import TweetReplies from './Component/TweetReplies';
import Profile from './Component/Profile';
import Home from './Component/Home';




function App() {

  useEffect(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.backgroundColor = '#eee8ef';
  }
}, [])
 
  return (

        <div className="row" style={{}}>
           <div className="col-1">

           </div>
           <div className="col-2 ">
           <SideBar></SideBar>
           </div>
           <div className="col-6" >
           <Routes>
                  <Route path='/profile/:userId' element={<Profile/>} ></Route>
                  <Route path='/Tweets' Component={TweetReplies}></Route>
                  <Route path='Home' Component={Home}></Route>
                  <Route path='/' Component={Home}></Route>
                  
           </Routes>
                
            
           </div>
           <div className="col-2">

           </div>
             {/* <ToastContainer></ToastContainer> */}
        </div>
     
        
    
  );
}

export default App;
