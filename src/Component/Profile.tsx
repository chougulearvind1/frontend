import  { memo, useCallback, useEffect, useMemo, useState } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import TweetList from './Home_Component/TweetList'
import EditProfile from './Profile_component/EditProfile'
import UploadProfileImg from './Profile_component/UploadProfileImg'

function Profile() {


   const token=Cookies.get('token')
   const id=Cookies.get('id')
    const {userId}=useParams<{ userId: string }>()
    const [UserData, setUserData] = useState<any|undefined>(undefined)
    const [LoggedUserOrNot, setLoggedUserOrNot] = useState(false)
    const [UserTweetsAndReplies, setUserTweetsAndReplies] = useState<any>()
    const [EditProfileModal, setEditProfileModal] = useState<boolean>(false)
    const [UploadProfileImgModal, setUploadProfileImgModal] = useState<boolean|undefined>(undefined)
    const [ProfileImage, setProfileImage] = useState<string|undefined>(undefined)

    useEffect(() => {
      
        const fetch = async () => {          
          const resp: AxiosResponse= await axios.get(`https://backend-3j4k.onrender.com/API/user/${userId}`,{headers:{Authorization:`Bearer ${token}`}})
            setUserData(await resp.data.user)
                             
         }
         if(userId!==undefined){
          fetch(); 
         }  
    }, [userId,token])
     
     const fetch =useCallback(
       async () => {
        console.log('fetchdata is called');
        if(UserData){
          const resp: AxiosResponse= await axios.post(`https://backend-3j4k.onrender.com/API/user/${UserData?._id}/tweets`,{},{headers:{Authorization:`Bearer ${token}`}})
       
        setUserTweetsAndReplies(await resp.data.UserTweets)
        }
        
       },
       [UserData, token]
     )
     
    useEffect(() => {
      
       if(UserData!==undefined){
        fetch(); 
       }  
    
      
    }, [UserData, fetch, token])
    
   
    
  
    const [FollowOrUnFollow, setFollowOrUnFollow] = useState<boolean>(false);
   
    

    useEffect(() => {

      if(UserData!==undefined) {
         setProfileImage(`https://raw.githubusercontent.com/chougulearvind1/images/main/img/${UserData?.profle_picture.originalname}`)
         if(id===UserData._id){
              setLoggedUserOrNot(true)
              
         }      
           if(UserData.followers.some((user:any) =>  user._id===id )){            
                      setFollowOrUnFollow(true)
           }  
           console.log(UserData,'Userdata');      
         }           
    }, [ UserData, id])   

  
    const follow = async () => { 
      const response = await axios.post(`https://backend-3j4k.onrender.com/API/user/${userId}/follow`, {}, {
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
      const response = await axios.post(`https://backend-3j4k.onrender.com/API/user/${userId}/unfollow`, {}, {
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
    
    
    const  UserTweetsAndRepliesMemo=useMemo(() => 
     
    <TweetList key={Date.now()} AllTweet={UserTweetsAndReplies}></TweetList>
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [UserTweetsAndReplies])
  return (
    <div>
       <div className="profile-page">
       {/* {EditProfileModal && <EditProfile  EditModal1={EditModal()}></EditProfile>} */}
       {EditProfileModal&&<EditProfile closeModal={() => {  setEditProfileModal(false) } }  ></EditProfile>}
       {UploadProfileImgModal && <UploadProfileImg closeModal={(profile) => { setUploadProfileImgModal(false);if(profile){ setProfileImage(profile); } }} userId={userId}></UploadProfileImg>}
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
                                <button   onClick={() => { setUploadProfileImgModal(true) }} className="btn btn-outline-primary">Upload Profile Photo</button>
                                <button onClick={() => { setEditProfileModal(true) }} className="btn btn-outline-dark">Edit </button>                                
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
            <h3>Tweets and Replies</h3>
            {UserTweetsAndRepliesMemo}
               
           
          </div>
        </div>
        
      </div>
        </div>
        
        <style>
          {`profile-info>.tweet-section>.card>.d-flex>.col-auto>img{
            content:url(${ProfileImage});            
          
          }`}
        </style>
    </div>
  )
}

export default memo(Profile) 