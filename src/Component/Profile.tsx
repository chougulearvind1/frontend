import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import './profile.css'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import TweetList from './Home_Component/TweetList'

function Profile() {


   const token=Cookies.get('token')
   const id=Cookies.get('id')
    const {userId}=useParams<{ userId: string }>()
    const [UserData, setUserData] = useState<any|undefined>(undefined)
    const [LoggedUserOrNot, setLoggedUserOrNot] = useState(false)
    const [UserTweetsAndReplies, setUserTweetsAndReplies] = useState<any>()
    
    useEffect(() => {
      
        const fetch = async () => {          
          const resp: AxiosResponse= await axios.get(`http://localhost:5000/API/user/${userId}`,{headers:{Authorization:`Bearer ${token}`}})
            setUserData(await resp.data.user)  
            setUserTweetsAndReplies(await resp.data.UserTweets)                   
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
    const [FollowOrUnFollow, setFollowOrUnFollow] = useState<boolean>(false);
   
    

    useEffect(() => {

      if(UserData!==undefined) {
         setProfileImage(`http://localhost:5000/profile_img/${UserData?.profle_picture.filename}`)
         if(id===UserData._id){
              setLoggedUserOrNot(true)
              
         }      
           if(UserData.followers.some((user:any) =>  user._id===id )){            
                      setFollowOrUnFollow(true)
           }  
           console.log(UserData,'Userdata');      
         }           
    }, [ UserData, id])   

    async function handleImageChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = event.target.files?.[0];
      
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
    const follow = async () => { 
      const response = await axios.post(`http://localhost:5000/API/user/${userId}/follow`, {}, {
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });      
      if(response.status){
        toast.success(response.data.message)
        setFollowOrUnFollow(true)
      }
     }   

     const Unfollow = async () => { 
      const response = await axios.post(`http://localhost:5000/API/user/${userId}/unfollow`, {}, {
        headers: {
          Authorization:`Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });      
      if(response.status){
        toast.success(response.data.message)
        setFollowOrUnFollow(false)
      }
     }
    
     
  return (
    <div>
       <div className="profile-page">
      <div className="profile-header">
        <div style={{zIndex:5}} className="profile-image-container">
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
                              
                            {FollowOrUnFollow ?(<button onClick={Unfollow} style={{margin:'10px'}} className="btn btn-dark">UnFollow</button>):
                            (<button onClick={follow} className="btn btn-dark">Follow</button>)}
                            
                          </div>)
                          }         
              
                       
                </div>
                
        <div className="profile-info">
          <h1 className="profile-name">{UserData?.Name}</h1>
          <p className="profile-username">@{UserData?.UserName}</p>
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-icon">🎂</span>
              <span>Date of Birth: {UserData?.date_of_birth}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span>Joined: {UserData?.createdAt}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span>Address: {UserData?.location}</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stats-item">
              <span className="stats-number">{UserData?.following.length}</span>
              <span className="stats-label">Following</span>
            </div>
            <div className="stats-item">
              <span className="stats-number">{UserData?.followers.length}</span>
              <span className="stats-label">Followers</span>
            </div>
          </div>
          <div className="tweet-section">
               <TweetList key={Date.now()} AllTweet={UserTweetsAndReplies}></TweetList>
            {/* <div className="tweet-container"style={{width:'-webkit-fill-available'}}>
              <h2 style={{textAlign:'center'}}>Tweets & Replies</h2>
              <div className="tweet">
                <p><strong>@johndoe</strong> Just enjoying the day! 🌞</p>
              </div>
              <div className="tweet">
                <p><strong>@johndoe</strong> Excited for the weekend! 🎉</p>
              </div>
              
            </div> */}
          </div>
        </div>
        
      </div>
        </div>
    </div>
  )
}

export default memo(Profile) 