import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import './profile.css'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

function Profile() {


   const token=Cookies.get('token')
   const id=Cookies.get('id')
    const {userId}=useParams<{ userId: string }>()
    const [UserData, setUserData] = useState<any|undefined>(undefined)
    const [LoggedUserOrNot, setLoggedUserOrNot] = useState(false)
    
    useEffect(() => {
      
        const fetch = async () => {          
          const resp: AxiosResponse= await axios.get(`http://localhost:5000/API/user/${userId}`,{headers:{Authorization:`Bearer ${token}`}})
            setUserData(await resp.data)  
                                 
         }
         if(userId!==undefined){
          fetch(); 
         }  
    }, [userId,token])
    const fileInputRef = useRef<HTMLInputElement>(null)
   
    const handleUpload = async () => {
      fileInputRef.current?.click()
      
      };
    
    const [ProfileImage, setProfileImage] = useState<string|undefined>(undefined)

    useEffect(() => {

      if(UserData!==undefined) {
         setProfileImage(`http://localhost:5000/profile_img/${UserData?.profle_picture.filename}`)
         if(id===UserData._id){
              setLoggedUserOrNot(true)
         } 
         }           
    }, [UserData,id])   

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = event.target.files?.[0];
        console.log('handle image change called');
         if (file && userId) {
      
         const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result as string);
                      };
                        reader.readAsDataURL(file);
          const fileArrayBuffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
          // const buffer=Buffer.from(fileArrayBuffer)
    
          try {
            console.log(userId,'userid');
            const response = await axios.post(`http://localhost:5000/API/user/${userId}/uploadProfilePic`, fileArrayBuffer, {
              headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'image/jpeg',
              },
            });
                  
            console.log('File uploaded successfully:', response);
          } catch (error) {
            console.error('Error uploading file:', error);
          }      
    }
    }
   
     
  return (
    <div>Profile
<div>
        <div className="row">
           <div className="col-1">

           </div>
           <div className="col-2">
           <SideBar></SideBar>
           </div>
           <div className="col-8">
           <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
          <img
            src={ProfileImage}
            alt="Profile"
            className="profile-image"
          />
        </div>
      </div>
      <div className="profile-body">
            <div className="profile-actions top-right">

              {
              LoggedUserOrNot?(<div>
                                <input ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        id="upload-photo"
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                <button   onClick={handleUpload}className="upload-btn">Upload Profile Photo</button>
                                <button className="edit-btn">Edit Details</button>
                            </div>):
                            (<div>
                            <button  className="btn btn-dark">Follow</button>
                          </div>)
                          }         
              
                       
                </div>
        <div className="profile-info">
          <h1 className="profile-name">{UserData?.Name}</h1>
          <p className="profile-username">@{UserData?.UserName}</p>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-icon">🎂</span>
              <span>Date of Birth: January 1, 1990</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>Joined: January 1, 2020</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>Address: 1234 Elm Street, Springfield</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stats-item">
              <span className="stats-number">500</span>
              <span className="stats-label">Following</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">1.2K</span>
              <span className="stats-label">Followers</span>
            </div>
          </div>
          <div className="tweet-section">
            <div className="tweet-container">
              <h2>Tweets & Replies</h2>
              <div className="tweet">
                <p><strong>@johndoe</strong> Just enjoying the day! 🌞</p>
              </div>
              <div className="tweet">
                <p><strong>@johndoe</strong> Excited for the weekend! 🎉</p>
              </div>
              {/* Add more tweets or replies as needed */}
            </div>
          </div>
        </div>
        
      </div>
    </div>
             
            
           </div>
           <div className="col-1">

           </div>
            
        </div>
       

      </div>

    </div>
  )
}

export default memo(Profile) 