import React, { useEffect, useState } from 'react'
import TweetList from './Home_Component/TweetList'
import {  useParams} from 'react-router-dom'
import Tweets from './Home_Component/Tweets';
import { toast } from 'react-toastify';
import axios from 'axios';


function TweetReplies() {    
      

       const {id}=useParams()
       const [Tweet, setTweet] = useState<any>()
       const [TweetDetails, setTweetDetails] = useState<any>()     
       const [ReplyObject, setReplyObject] = useState<any[]>()   


       useEffect(() => {
         async function FetchData(){
         
          const config={
            headers:{  
              'Content-Type': 'application/json',
              }
            }
          const resp= await axios.get(`https://backend-3j4k.onrender.com/API/tweet/${id}`,config) 
           setTweet(resp.data.message)    
           setTweetDetails(resp.data.message.replies)      
        
         }
        
        FetchData();
       return () => {
         
       }
     }, [id])
     
       useEffect(() => {
         const FetchData = async () => {
    try {   const config={
              headers:{  
                'Content-Type': 'application/json'                 
                }
              }
              console.log(TweetDetails,'Tweet Details');
              const  AllTweetReplies= TweetDetails.map(async (ReplyTweet: any) => { 
                 const resp= await axios.get(`https://backend-3j4k.onrender.com/API/tweet/${ReplyTweet?._id}`,config)
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
       }, [TweetDetails])
            
  return (
    <div> 
        { Tweet && <Tweets key={Tweet._id} TweetData={Tweet} ></Tweets> }
         
        <h3>Replies</h3>
        { ReplyObject && <TweetList key={Date.now()} AllTweet={ReplyObject}></TweetList>}

    </div>
  )
}

export default TweetReplies