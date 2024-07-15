
import {useEffect, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import TweetList from './Home_Component/TweetList'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'



const Home=()=>  {
  
  const [AllTweet, setAllTweet] = useState<any>([])
  const UserName=Cookies.get('UserName')

  useEffect(() => {
    const fetchdata = async () => {
     const resp:AxiosResponse= await axios.get('http://localhost:5000/API/tweet/')
     if(!resp){throw new Error('network response was not ok')}

     // Flatten the array of tweets including their retweets
     const allTweetsWithRetweets = [];
        for (const tweet of await resp.data.message) {
          console.log(tweet ,'fetched tweets');
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


       console.log('data',resp.data.message);
       
      
    }
    fetchdata()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
     
    return (
      <div>
        <div className="row">
           <div className="col-1">

           </div>
           <div className="col-2">
           <SideBar></SideBar>
           </div>
           <div className="col-8">
              {
                <TweetList key={Date.now()} AllTweet={AllTweet}  ></TweetList>
              }
              
             
            
           </div>
           <div className="col-1">

           </div>
            
        </div>
       

      </div>
    )
  }


export default Home
