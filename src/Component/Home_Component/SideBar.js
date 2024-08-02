import  "./SideBar.css";
import img from "../../pigeon-with-love-png";


import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faIdCard } from "@fortawesome/free-solid-svg-icons";


function SideBar() {

   const Name= Cookies.get('Name');
   const UserName=Cookies.get('UserName')
   const userId=Cookies.get('id')
   const [LoggedOrNot, setLoggedOrNot] = useState(false)// if user not logged  then all tweets freez, until it not login
  
   useEffect(() => {
     if (userId ) {
    setLoggedOrNot(true)
  }   
   }, [userId]) 

  return (
    // - Sidebar will contain all the navigation links, app logo and logged in user name
   <div className=" d-flex align-content-between flex-wrap align-item-center"style={{height:'95vh',overflow:'hidden',position:'sticky',top:'0' }}>    
     <nav className="navbar navbar-expand-lg">
      <div className="">  
      {/* - Clicking on the nav links will get to appropriate page      */}
        <ul className="navbar-nav d-flex  flex-column align-item-center ">
          <li className=""><a href="/" className="img-fluid" style={{display:'flex',justifyContent:'center'}}>
            <img style={{ width:"160px",height:'180px'}} src={img} alt="img" />      
          </a></li>
         
          <li className="nav-item">
            <a href="/" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
              </svg>
              <span>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a href={`/Profile/${userId}`} className="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
              </svg>
               <span>Profile</span>
             </a>
          </li>
          {/* - We also have a logout button and clicking this will logout the user and redirect to
the login page again. */}
        {LoggedOrNot?
        ( <li onClick={() => { Cookies.remove('id');Cookies.remove('UserName');Cookies.remove('Name') }} className="nav-item">
            <a href="/login" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
              </svg>
               <span>Logout</span>
            </a>
          </li>
        ):(
// I added this feature:
// If the user is logged in, the logout button is shown in the navigation bar.
// Otherwise, the login and register buttons are shown in the navigation bar.
          <><li className="nav-item">
            <a href="/login" className="nav-link">
              <FontAwesomeIcon icon={faArrowRightToBracket}width={45} height={30} />
               <span>Login</span>
            </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link"><FontAwesomeIcon icon={faIdCard} width={45} height={30} />
               <span>Register</span>
               </a>
            </li></>
          )}          
        </ul>        
      </div>
     </nav>

     <div className='nav-item'>
              <div className="d-flex">
                <div className=" d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                  </svg>
                  </div>
                    <div>
                      <h6 style={{margin:'auto',fontFamily:'auto'}}>{Name && Name.charAt(0).toUpperCase()+Name.slice(1)}</h6>
                       <h6 className={'text-muted'} style={{margin:'auto'}}>@{UserName}</h6>                  
                    </div>                
              </div>
     </div>
     {/* adding style to sidebar more responsive */}
    <style>
        {` 
          h4:hover{
          text-decoration:underline;
          }

          button>span{
              font-size: larger;

          }
           .nav-item>a{
          
            padding:0 10px;
            border-radius:15px;
           }
            .nav-item>a:hover{
              
              background-color:	#00aced
             }
          /* Default styles for all screen sizes */
          .nav-item {
            font-size: 1rem;
            padding: 5px;
            margin-bottom:5%;
            width:100%
            
          }

          /* Increase size for medium screens (md) and up */
          @media (min-width: 768px) {
            .nav-item {
              transform: scale(1);
              transform-origin: top left;
            }
          }

          /* Increase size for large screens (lg) and up */
          @media (min-width: 992px) {
            .nav-item {
              transform: scale(1.1);
              transform-origin: top left;
            }
          }

          /* Increase size for extra large screens (xl) and up */
          @media (min-width: 1200px) {
            .nav-item {
              transform: scale(1.2);
              transform-origin: top left;
            }
          }

          /* Increase size for extra extra large screens (xxl) and up */
          @media (min-width: 1400px) {
            .nav-item {
              transform: scale(1.3);
              transform-origin: top left;
            }
          }
        `}
      </style>
   </div>

  )
}

export default SideBar