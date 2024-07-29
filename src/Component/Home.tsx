
import {memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import TweetList from './Home_Component/TweetList'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import TweetModal from './Home_Component/TweetModal'


const Home=()=>  {  
  const [AllTweet, setAllTweet] = useState<any[]>([])
  const [ShowModal, setShowModal] = useState(false);   
  const UserName=Cookies.get('UserName')

  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchdata = async () => {
     const resp:AxiosResponse= await axios.get('http://localhost:5000/API/tweet/')
     if(!resp){throw new Error('network response was not ok')}
     // Flatten the array of tweets including their retweets
     const allTweetsWithRetweets = [];
        for (const tweet of await resp.data.message) {
        allTweetsWithRetweets.push(tweet);
        if (tweet.retweetBy) {
            for (const retweet of tweet.retweetBy) {
                  let Retweet={...tweet};                    
                   Retweet.ReTweetUser=retweet.UserName
                   if(retweet.UserName===UserName){
                      allTweetsWithRetweets.pop()
                      Retweet.ReTweetUser='You';
                    }
                   
            allTweetsWithRetweets.unshift(Retweet);
            }          
        }
        }      
        allTweetsWithRetweets.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });   

       setAllTweet(allTweetsWithRetweets)    
    }
    fetchdata()
      const innerDiv=childRef.current;
     
      const ScrollBody = () => {
          const scrollTop=document.getElementById('root')?.scrollTop
        if(innerDiv && scrollTop){
          innerDiv.scrollTop=scrollTop;
        }        
      }
      
        window.addEventListener('scroll',ScrollBody)
      
      return () => {
        
        window.removeEventListener('scroll', ScrollBody);
        
      };
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const closeModal = 
    (Tweet:any) => {
      setAllTweet((prevTweet) => [Tweet,...prevTweet] );
       setShowModal(false)
    }
     const OpenModal = () => {
       setShowModal(true)
      
     }
      
    
    const updatefunction = useCallback((updatedTweetData:any) => { 
     
       setAllTweet(updatedTweetData)
     },[])
    //  AllTWeet is not run at every State Change so memo is used
    const AllTweetMemo= useMemo(() => <TweetList  key={Date.now()} AllTweet={AllTweet} updatedTweets={updatefunction} ></TweetList> , [AllTweet, updatefunction]) 
    return (
      <div ref={childRef}  className='card p-4'style={{backgroundColor:'#ffffff'}}>

          {ShowModal && <TweetModal show={ShowModal} closeModal={closeModal} > </TweetModal> }
          <div style={{position:'sticky',zIndex:'10',top:'0'}}>
            <div  className=" d-flex  mb-3"style={{flexDirection:'row',justifyContent:'space-between', backgroundColor:'#ffffff'}}>
                <h3>Home</h3>
                <button className="btn " style={{backgroundColor:'#1ba1ef'}} onClick={OpenModal} data-toggle="modal" data-target="#exampleModal">Tweet</button>
                
        </div>  
          </div>
              
        <div >
          { AllTweetMemo }
        </div>
                
      </div>
    )
  }


export default memo(Home)
 