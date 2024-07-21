import React, { useEffect, useState } from 'react'
import TweetList from './Home_Component/TweetList'
import { useLocation} from 'react-router-dom'
import Tweets from './Home_Component/Tweets';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

function TweetReplies() {    
   
       const token = Cookies.get('token')
       const location=useLocation();
        
       const TweetDetails=location.state.Tweets.replies;
       const [ReplyObject, setReplyObject] = useState<any[]>()
       
       useEffect(() => {
         const FetchData = async () => {
    try {   const config={
              headers:{  
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
                }
              }
              console.log(TweetDetails,'Tweet Details');
              const  AllTweetReplies= TweetDetails.map(async (ReplyTweet: any) => { 
                console.log(ReplyTweet,'reply tweet');
                 const resp= await axios.get(`http://localhost:5000/API/tweet/${ReplyTweet?._id}`,config)
               return resp.data.message;
             })
             setReplyObject( await Promise.all( AllTweetReplies))            
          } catch (error) {
            if(axios.isAxiosError(error)){
              toast.error(error.response?.data.message)
            }              
          }
         }
         if(TweetDetails!==undefined){
          FetchData()
         }
       }, [TweetDetails, token])
            
  return (
    <div> 
        
        <Tweets key={location.state.Tweets._id} TweetData={location.state.Tweets} ></Tweets> 
        <h3>Replies</h3>
        {<TweetList key={Date.now()} AllTweet={ReplyObject}></TweetList>}

    </div>
  )
}

export default TweetReplies