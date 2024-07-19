
import {memo, useCallback, useEffect, useRef, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import TweetList from './Home_Component/TweetList'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import TweetModal from './Home_Component/TweetModal'
import Tweets from './Home_Component/Tweets'


const Home=()=>  {  
  const [AllTweet, setAllTweet] = useState<any>([])
  // const [ShowModal, setShowModal] = useState(false);  
  const ShowModal = useRef<boolean>()
  ShowModal.current=false;
  const [NewTweet, setNewTweet] = useState<any>()
  const UserName=Cookies.get('UserName')
  const userId=Cookies.get('id')

  useEffect(() => {
    const fetchdata = async () => {
     const resp:AxiosResponse= await axios.get('http://localhost:5000/API/tweet/')
     if(!resp){throw new Error('network response was not ok')}
      console.log('fetch data  is called');
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

  const closeModal = useCallback(
    (Tweet:any) => {
      setNewTweet(Tweet)
      ShowModal.current=false
    },
    [],
  )
     const OpenModal = useCallback(() => {
       ShowModal.current=true
       console.log(ShowModal.current,'openMoadal');
     },[])
      
    console.log('home is rendered');
     console.log(ShowModal.current,'ref');
    return (
      <div>
        <div className="row">
           <div className="col-1">

           </div>
           <div className="col-2">
           <SideBar></SideBar>
           </div>
           <div className="col-8">
              <TweetModal show={ShowModal.current} closeModal={closeModal} > </TweetModal>   
              <div className="card d-flex p-3 mb-3"style={{flexDirection:'row',justifyContent:'space-between'}}>
              <h4>Home</h4>
              <button className="btn  btn-primary"onClick={OpenModal} data-toggle="modal" data-target="#exampleModal">Tweet</button>
              
      </div>
      {NewTweet && (
          <li  key={NewTweet._id}  className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>                  
                  <Tweets key={NewTweet._id} TweetData={NewTweet} userId={userId} ></Tweets>                 
              </li>
        )}
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


export default memo(Home)
