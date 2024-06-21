import React from 'react'
import  "./SideBar.css";
import img from "./tweet.png";
import Cookies from 'js-cookie';


function SideBar() {

   const Name= Cookies.get('Name');
   const UserName=Cookies.get('UserName')
 
  // useEffect(() => {
  //   const fetchUserData =async () => {
  //     const token=Cookies.get('token')
  //     try {
  //       const resp=await axios.get('api/user')
  //     } catch (error) {
        
  //     }

  //       }
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  

   

  return (
   <div className=" d-flex align-content-between flex-wrap align-ite-start"style={{height:'100vh'}}>
     <nav className="navbar navbar-expand-lg">
      <div className="">
       
        <ul className="navbar-nav flex-column ">
        <li className="nav-item"><a href="/Home" className="">
          <img style={{width:"50%"}} src={img} alt="img" />      
        </a></li>

          <li className="nav-item"><a href="/Home" className="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
</svg>Home</a></li>
          <li className="nav-item"><a href="/Profile" className="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
</svg>Profile</a></li>
          <li className="nav-item"><a href="/login" className="nav-link"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
</svg>Logout</a></li>
        </ul>
        
      </div>
     </nav>

     <div>
              <div className="d-flex">
                <div className=" d-flex align-item-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                      </svg>
                  </div>
                    <div>
                      <h5 style={{margin:'auto'}}>{Name}</h5>
                       <h7 style={{margin:'auto'}}>@{UserName}</h7>                  
                    </div>                  
                
                
              </div>
    </div>


   </div>
  )
}

export default SideBar