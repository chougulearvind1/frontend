
import {useEffect, useState } from 'react'
import SideBar from './Home_Component/SideBar'
import TweetList from './Home_Component/TweetList'
import axios, { AxiosResponse } from 'axios'



const Home=()=>  {
  
  const [AllTweet, setAllTweet] = useState([])


  useEffect(() => {
    const fetchdata = async () => {
     const resp:AxiosResponse= await axios.get('http://localhost:5000/API/tweet/')
     if(!resp){throw new Error('network response was not ok')}
       setAllTweet(await resp.data.message)
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
