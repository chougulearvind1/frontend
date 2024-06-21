import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Tweets from './Tweets';
import TweetModal from './TweetModal';
import Cookies from 'js-cookie';



const TweetList:React.FC=()=> {
    const [Tweetss, setTweetss] = useState<any>([])
    const [ShowModal, setShowModal] = useState(false);
    const id=Cookies.get('id')

    const closeModal = () => {
      
        setShowModal(false)
        
       }
       const OpenModal = () => {
        setShowModal(true);
       }
 useEffect(() => {
   const fetchdata = async () => {
    const resp:any= await axios.get('http://localhost:5000/API/tweet/')
    if(!resp){throw new Error('network response was not ok')}
      setTweetss(resp.data.message)
      console.log(Tweetss,'twitss');
   }
   fetchdata()

 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])
  
   return(
    <div>
        <TweetModal show={ShowModal} closeModal={closeModal} > </TweetModal>
        <div className="card d-flex p-3 mb-3"style={{flexDirection:'row',justifyContent:'space-between'}}>
        <h4>Home</h4>
        <button className="btn  btn-primary"onClick={OpenModal} data-toggle="modal" data-target="#exampleModal">Tweet</button>
         
      </div>
        <ul style={{padding:'0',margin:'0', height:'100vh',overflowY:'auto'}}>
           {Tweetss.map(
            (tweet: any) => (
                <li className='mb-2' style={{listStyleType:'none',padding:'0',margin:'0'}}>
                    <Tweets tweet_data={tweet} userId={id}></Tweets>
                </li>
           )
           )}
        </ul>
    </div>
   )

 }

export default TweetList