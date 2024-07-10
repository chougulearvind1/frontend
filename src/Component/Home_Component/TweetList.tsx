
import React, { useEffect, useState } from 'react'
import Tweets from './Tweets';
import TweetModal from './TweetModal';
import Cookies from 'js-cookie';



interface TweetListProps{
  AllTweet:any
}
const TweetList:React.FC<TweetListProps> = ({AllTweet}) => { 
     const [TweetData, setTweetData] = useState(AllTweet)
    const [Retweet, setRetweet] = useState<any[]>([]);
    const [ShowModal, setShowModal] = useState(false);  
    const [NewTweet, setNewTweet] = useState<any>()
    const userId=Cookies.get('id')   
    const closeModal = (Tweet: any) => {  
        console.log(Tweet,'tweet in tweetlist');   
        console.log(TweetData,'all tweet1'); 
        
        setNewTweet(Tweet)
        // setTweetData((prevTweetData: any) => [Tweet, ...prevTweetData])
        console.log(TweetData,'all tweet2'); 

        setShowModal(false)        
       }
       const OpenModal = () => {
        setShowModal(true);        
       }      
      //  const [UpdatedReTweets, setUpdatedReTweets] = useState<any[]>()
      const OnReTweet = async (params: any,Tweet:any) => {        
              
        if(Tweet && Tweet.retweetBy.every((item:any)=>typeof item==='object')){          
          let updatedRetweets= await Promise.all(Tweet.retweetBy.map(async (item: any,index: any) => {
            const updatedTweetObj={...Tweet, ReTweetUser:item.UserName}        
            return updatedTweetObj;          
          }) )  
          if(updatedRetweets.length>0){ 
          
             setRetweet((prevTweet: any) =>[...prevTweet,...updatedRetweets].reverse())                     
          }
       
              }      
      }   
      useEffect(() => {
        console.log(TweetData, 'all tweet effect');
      }, [TweetData]);
      // useEffect(() => {
      //   console.log('Retweets updated:', Retweet);
      
        
      // }, [Retweet, setRetweet])
      
      
   return(
    <div>
        <TweetModal show={ShowModal} closeModal={closeModal} > </TweetModal>
        
        <div className="card d-flex p-3 mb-3"style={{flexDirection:'row',justifyContent:'space-between'}}>
        <h4>Home</h4>
        <button className="btn  btn-primary"onClick={OpenModal} data-toggle="modal" data-target="#exampleModal">Tweet</button>
         
      </div>
        <ul style={{padding:'0',margin:'0', height:'100vh',overflowY:'auto'}}>        
          {/* If retweet has retweets of array then every tweet indicate name  on tweet  whoes is retweet */}
          {/* {Retweet && Retweet.map((item:any,index:any)=> 
            (<li  key={'b'+index} className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>
                  <Tweets  TweetData={item} userId={userId} OnReTweet={OnReTweet}></Tweets>
              </li>)
          )}        */}
        {/* {JSON.stringify(TweetData)} */}
        {NewTweet && (
          <li  key={NewTweet._id}  className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>                  
                  <Tweets key={'a'} TweetData={NewTweet} userId={userId} OnReTweet={OnReTweet}></Tweets>                 
              </li>
        )}
        { TweetData &&  TweetData.map(
          (tweet: any,index: React.Key ) => (            
            <li  key={'a'+index}  className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>                  
                  <Tweets key={'a'+index} TweetData={tweet} userId={userId} OnReTweet={OnReTweet}></Tweets>                 
              </li>
          )
              
          )}
        </ul>
    </div>
   )

 }


export default TweetList