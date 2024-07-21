import React, { useEffect } from 'react'
import TweetList from './Home_Component/TweetList'
import { useLocation} from 'react-router-dom'
import Tweets from './Home_Component/Tweets';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

function TweetReplies() {    
       const token = Cookies.get('token')
       const location=useLocation();
       const TweetDetails=location.state.Tweet;
       console.log(location.state.Tweet,'location tweet'); 
       useEffect(() => {
         const FetchData = async () => {
          try {
            
            const config={
              headers:{  
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
                }
              }
            const resp= await axios.get(`http://localhost:5000/API/tweet/${TweetDetails._id}`,config)
            console.log(resp.data,'resp data');
               toast.success(resp.data.message)
    
          
            
          } catch (error) {
            if(axios.isAxiosError(error)){
              toast.error(error.response?.data.message)
            }      
            
          }
         }
           FetchData()
         return () => {
           
         }
       }, [TweetDetails, token])
            
  return (
    <div> 
        
        <Tweets key={'abc'} TweetData={location.state.Tweet} ></Tweets> 
        <h3>Replies</h3>
        {<TweetList key={Date.now()} AllTweet={location.state.Tweet.replies}></TweetList>}

    </div>
  )
}

export default TweetReplies