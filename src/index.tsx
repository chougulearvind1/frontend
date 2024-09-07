import React  from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import login from './Component/login';
import Register from './Component/register';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// eslint-disable-next-line react-hooks/rules-of-hooks

root.render(
  // <React.StrictMode>
    <div>
    <BrowserRouter>
                <Routes>
                  {/* * added for any other path */}
                  <Route path='*' Component={App}></Route>
                  <Route path='/register' Component={Register} ></Route> {/* Route for user registration */}
                  <Route path='/login' Component={login} ></Route>{/* Route for user login */}
                </Routes>
                </BrowserRouter>   
    <ToastContainer position='top-right'></ToastContainer>
      {/* show toast at top right position */}
    {/* <App/> */}
  </div>
  // </React.StrictMode>
  
    
    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

