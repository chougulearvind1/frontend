
import React, { memo, useMemo, useState } from 'react'
import Tweets from './Tweets';




interface TweetListProps{
  AllTweet:any
}
const TweetList:React.FC<TweetListProps> = ({AllTweet}) => { 
  const [AllTweets, setAllTweets] = useState(AllTweet)  
  
        
      //  const [UpdatedReTweets, setUpdatedReTweets] = useState<any[]>()
      // const OnReTweet = async (params: any,Tweet:any) => {        
              
      //   if(Tweet && Tweet.retweetBy.every((item:any)=>typeof item==='object')){          
      //     let updatedRetweets= await Promise.all(Tweet.retweetBy.map(async (item: any,index: any) => {
      //       const updatedTweetObj={...Tweet, ReTweetUser:item.UserName}        
      //       return updatedTweetObj;          
      //     }) )  
      //     if(updatedRetweets.length>0){ 
          
      //        setRetweet((prevTweet: any) =>[...prevTweet,...updatedRetweets].reverse())                     
      //     }
       
      //         }      
      // }   

        console.log(AllTweet, 'all tweet effect');
       
       
      const AllTWeetMemo= useMemo(() => {

       
     if(AllTweets!==undefined){
         return(AllTweets.map(
            (tweet: any,index: React.Key ) => (            
              <li  key={'a'+index}  className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>                  
                    <Tweets key={'a'+index} TweetData={tweet} ></Tweets>                 
                </li>)             
            ))
     }
             
        
      }, [AllTweets])
      
   return(
    <div>
        
        <ul style={{padding:'0',margin:'0', height:'100vh',overflowY:'auto'}}>        
          
       
        {  AllTWeetMemo  }
        </ul>
    </div>
   )

 }


export default memo(TweetList) 