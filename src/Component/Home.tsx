
import {memo, useEffect, useMemo, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import TweetList from './Home_Component/TweetList'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import TweetModal from './Home_Component/TweetModal'


const Home=()=>  {  
  const [AllTweet, setAllTweet] = useState<any[]>([])
  const [ShowModal, setShowModal] = useState(false);   
  const UserName=Cookies.get('UserName')

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
      
    console.log('home is rendered')
    //  AllTWeet is not run at every State Change so memo is used
    const AllTweetMemo= useMemo(() => <TweetList key={Date.now()} AllTweet={AllTweet}  ></TweetList> , [AllTweet]) 
    return (
      <div>

          {ShowModal && <TweetModal show={ShowModal} closeModal={closeModal} > </TweetModal> }
                
          <div  className="card d-flex p-3 mb-3"style={{flexDirection:'row',justifyContent:'space-between', backgroundColor:'#eee8ef'}}>
                <h4>Home</h4>
                <button className="btn  btn-primary"onClick={OpenModal} data-toggle="modal" data-target="#exampleModal">Tweet</button>
                
        </div>      
                {
                 AllTweetMemo
                }
      </div>
    )
  }


export default memo(Home)
 