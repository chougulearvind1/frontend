import React, { useEffect } from 'react';
import './App.css';
import SideBar from './Component/Home_Component/SideBar';
import { Route, Routes } from 'react-router-dom';
import TweetReplies from './Component/TweetReplies';
import Profile from './Component/Profile';
import Home from './Component/Home';




function App() {

  useEffect(() => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.backgroundColor = '#ffffff';
  }
}, [])
 
  return (

        <div className="row" style={{}}>
           <div className="col-1 col-md-1 col-lg-1 d-none d-md-block">

           </div>
           <div className=" col-sm-3 flex-sm-column col-md-2  ">
           <SideBar></SideBar>
           </div>
           <div className="col-12  col-sm-9  col-md-6" >
           <Routes>
                  <Route path='/profile/:userId' element={<Profile/>} ></Route>
                  <Route path='/Tweets' Component={TweetReplies}></Route>
                  <Route path='Home' Component={Home}></Route>
                  <Route path='/' Component={Home}></Route>
                  
           </Routes>
                
            
           </div>
           <div className="col-2  d-none col-md-2 col-md-block">

           </div>
             {/* <ToastContainer></ToastContainer> */}
        </div>
     
        
    
  );
}

export default App;
