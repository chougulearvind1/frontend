

import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRetweet,faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart,faComments } from '@fortawesome/free-regular-svg-icons';
import axios  from 'axios';
import Cookies from 'js-cookie';
import ReplyModal from './ReplyModal';




interface Tweets_props{
  TweetData:any,
  userId:any,
  OnReTweet:any

}
const Tweets:React.FC<Tweets_props> = ({TweetData,userId,OnReTweet}) => {  
  const [Tweet, setTweet] = useState<any>(TweetData)
        
   const token=Cookies.get('token')   
  const [IsLiked, setIsLiked] = useState()
  const [LikeCount, setLikeCount] = useState('')
  const [ShowModal, setShowModal] = useState(false) 
  const [ReTweetCount, setReTweetCount] = useState<any>()


  const OpenModal = () => {
   setShowModal(true)   
  }
  const close = () => {  
    
    setShowModal(false);  
    
  }
  
        // useEffect(() => {      
        //    async function populate(reply:any) 
        //    {  
        //      console.log(Tweet._id,'tweet id');
        //      if(reply && reply.every((item:any)=>(typeof item === 'string')))
        //         {
        //           reply.map(async (item: any,index:any)=>{
        //           try{
        //             console.log(JSON.stringify(item),'item',Tweet.id)
        //             const resp=await axios.get(`http://localhost:5000/API/tweet/${item}`,{headers:{Authorization:`Bearer ${token}`}})
        //              Tweet.replies[index]= await resp.data.message;
        //              setTweet(Tweet.replies[index])
                  
        //           }
        //           catch(error){
        //             console.log(error);
        //           }

        //         })
        //         }
                
        //     }
           
        //     if(Tweet.replies){
        //       populate(Tweet.replies)
              
        //     }         
       
           
              
        // // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [Tweet])    
    
      const handleReTweet = async () => {
        try {
          const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}/retweet`,{},{headers:{Authorization:`Bearer ${token}`}})
          setReTweet(resp.data)
        } catch (error) {
          console.error(error);
          
        }
      }
        
      const handleLike = async () => {
        try {
          
          const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}/like`,{},{headers:{Authorization:`Bearer ${token}`}})
          setIsLiked( resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)

        } catch (error) {
          console.error(error);
          
        }
      }
      const handleDisLike = async () => {
        try {
          
          const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}/dislike`,{},{headers:{Authorization:`Bearer ${token}`}})
          setIsLiked( resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)
        } catch (error) {
          console.error(error);
          
        }
      }       

        
        useEffect(() => {
                    
             if(Tweet?.likes?.every((Like: any)=>typeof Like ==='object')){
                          setIsLiked(Tweet.likes?.some((like:any)=>like._id===userId))
            }
            else{
                            setIsLiked(Tweet.likes?.some((like:any)=>like===userId))

            } 
             setLikeCount(Tweet.likes?.length)            
              setReTweetCount(Tweet?.retweetBy?.length)
              if(Tweet.retweetBy){
                if(!Tweet.ReTweetUser){
                OnReTweet(Tweet.retweetBy,Tweet) 
                }
                
              }
                                   
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[])
          const [ReTweet, setReTweet] = useState<any>()
      
            
            
          
          


  return (
    <div>
          <ReplyModal show={ShowModal} closeModal={close} id={Tweet._id}></ReplyModal> 
          
         
        <div className="card " >
             {Tweet.ReTweetUser  && ( <div>
                  <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'20px'}} /> 
                  <span>Retweeted by {Tweet.ReTweetUser}</span>                 
               </div> )}
            <div className="d-flex" style={{flexDirection:'row'}}>
                          <div style={{marginRight:'10px'}} className='col-1'>
                            <img style={{width:'60px',height:'60px'}} src={`http://localhost:5000/profile_img/${Tweet?.tweetedBy?.profle_picture?.filename}`} alt="" className="rounded-circle mr3" />
                        </div>
                        <div className='col'>
                        
                          <div className="  d-flex align-item-center">               
                            <h5 className="mb-0">{Tweet?.tweetedBy?.Name}</h5>
                            <small className="text-muted">{new Date(Tweet?.tweetedBy?.createdAt).toLocaleString()}</small>
                                      
                        </div>
                        <div className="card-body">
                          <p className="mt-3">{Tweet?.content}</p> 
                                

                        </div>
                        <div className=" " >
                            {
                              IsLiked?
                            <button className="btn btn-link" onClick={handleDisLike}>
                                <FontAwesomeIcon icon={solidHeart } style={{fontSize:'20px',color:'red'}}/> <span>{ LikeCount} </span>
                            </button>

                            :
                            <button className="btn btn-link" onClick={handleLike} >

                                <FontAwesomeIcon icon={regularHeart} style={{fontSize:'20px',color:'red'}}/> <span> {LikeCount}  </span>
                            </button>
                            
                            }
                              
                          <button className="btn btn-link" onClick={OpenModal}>
                            <FontAwesomeIcon icon={faComments} style={{fontSize:'20px'}}/>
                            <span>{Tweet.replies.length}</span>
                          </button>
                          <button className="btn btn-link" onClick={handleReTweet}>
                            <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'20px'}} /> 
                            <span>{ReTweetCount}</span>

                          </button>
                        </div>              
                    
                    
                    <div className=''>
                    
                    { Tweet.replies  && (
                      <div>
                        {/* {Replies &&  Replies.map((reply:any)=>(<Tweets key={reply._id} tweet_data={reply} userId={userId}></Tweets>))} */}
                        {Tweet.replies.every((item: any)=>typeof item=='object') &&  Tweet.replies.map((reply:any,index:any)=>(
                            <div  key={Date()+index}>
                              <p style={{fontSize:'xx-small'}}>{JSON.stringify(reply)}</p>
                              <Tweets key={Date()+index} TweetData={reply} userId={userId} OnReTweet={OnReTweet}></Tweets>
                            </div> ))}                

                      </div>
                  )}
                    
                    </div>        
                    </div>
            </div>
           
        </div>

    </div>
  )

  
}

export default Tweets