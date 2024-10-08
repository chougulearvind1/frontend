
import React, { memo, useCallback,  useMemo,  useState } from 'react'
import Tweets from './Tweets';




interface TweetListProps{
  AllTweet:any,
  updatedTweets?:(updateTweets: any) => void;
}
const TweetList:React.FC<TweetListProps> = ({AllTweet,updatedTweets}) => { 
  const [AllTweets] = useState<any[]>(AllTweet)  
  
        
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

        
        const DeleteTweet= useCallback(
           async (TweetforDelete:any) => {
            //delete tweet from array using filter
             const filter=await Promise.all(AllTweets.filter((element) => {
            return element._id!==TweetforDelete
          }))     
          if(updatedTweets)       
            updatedTweets(filter)      
            
           },
           [AllTweets, updatedTweets]
         )
         
       
       //memo is used for not render until input data not change
      const AllTWeetMemo= useMemo(() => {       
          if(AllTweets!==undefined){
              return(AllTweets.map(
                  (tweet: any ) => (            
                    <li  key={tweet._id}  className='' style={{listStyleType:'none',padding:'0',margin:'0'}}>                  
                          <Tweets key={tweet?._id} TweetData={tweet} DelTweet={DeleteTweet}></Tweets>                 
                </li>)             
            ))
     }
             
        
      }, [AllTweets, DeleteTweet])
     
   return(
    <div>
        
        <ul style={{padding:'0',margin:'0'}}>        
          
       
        {  AllTWeetMemo  }
        </ul>
    </div>
   )

 }


export default memo(TweetList) 