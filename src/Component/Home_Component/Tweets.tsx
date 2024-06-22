

import React, { memo, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet,faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart,faComments } from '@fortawesome/free-regular-svg-icons';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import ReplyModal from './ReplyModal';



interface Tweets_props{
  tweet_data:any,
  userId:any
}

const Tweets:React.FC<Tweets_props> = ({tweet_data,userId}) => {
   const Tweet=tweet_data;
  const [NestedReplies, setNestedReplies] = useState<any>()
  let render=0;
  render=render+1;
  console.log(render,"render 1");
 
console.log(Tweet,'Tweets');
  const token=Cookies.get('token')
  const [IsLiked, setIsLiked] = useState(false)
  const [LikeCount, setLikeCount] = useState('')
  const [ShowModal, setShowModal] = useState(false)

  
  

  const OpenModal = () => {
   setShowModal(true)
   
  }
  const close = () => {
    console.log('clicked');
    console.log(ShowModal,'showModal');
    setShowModal(false);
    console.log(ShowModal,'showModal1');
    
  }
  useEffect(() => {
    setIsLiked(Tweet.likes?.some((like:any)=>like?._id===userId))
    setLikeCount(Tweet.likes?.length)
    console.log(IsLiked,"isliked",LikeCount,"likecount");
    let render=0;
  render=render+1;
  console.log(render,"render 1");
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
        useEffect(() => {      
        
           async function populate(reply:any) 
           {  console.log(JSON.stringify(Tweet.replies),"populate reply");
             if(reply.replies && reply.replies.every((item:any)=>(typeof item === 'string')))
                reply.replies.map(async (item: any)=>{
                  try{
                    const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}`,{},{headers:{Authorization:`Bearer ${token}`}})
                    setNestedReplies(resp.data.message)
                   Tweets(NestedReplies,userId)
                  console.log(JSON.stringify(await resp.data.message),"populate response");
                  
                  }
                  catch(error){
                    console.log(error);
                  }

                })
            }
           
            if(Tweet.replies){
              populate(Tweet.replies)
            }
          
       
        
              
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [tweet_data])
        
    
      
        
      const handleLike = async () => {
        try {
          
          const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}/like`,{},{headers:{Authorization:`Bearer ${token}`}})
          console.log(resp,'resp');
          setIsLiked(resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)
        } catch (error) {
          console.error(error);
          
        }
      }

      const handleDisLike = async () => {
        try {
          
          const resp=await axios.post(`http://localhost:5000/API/tweet/${Tweet?._id}/dislike`,{},{headers:{Authorization:`Bearer ${token}`}})
          console.log(resp,'resp');
          setIsLiked(resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)
        } catch (error) {
          console.error(error);
          
        }
      }


 




  return (
    <div>
          
          <ReplyModal show={ShowModal} closeModal={close} id={Tweet._id}></ReplyModal> 
         <p style={{fontSize:'xx-small'}}>{JSON.stringify(Tweet.replies)}</p>
         
        <div className="card d-flex" style={{flexDirection:'row'}}>
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
               
              </button>
              <button className="btn btn-link">
                <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'20px'}} /> 
              </button>
            </div>              
        
        
        <div className=''>
        
         {Tweet.replies && Tweet.replies.length>0 && (
          <div>
            {/* {Replies &&  Replies.map((reply:any)=>(<Tweets key={reply._id} tweet_data={reply} userId={userId}></Tweets>))} */}
            {Tweet.replies &&  Tweet.replies.map((reply:any)=>(<Tweets key={reply._id} tweet_data={reply} userId={userId}></Tweets>))}                

          </div>
       )}
        
        </div>
        
        </div>
        </div>

    </div>
  )

  
}

export default memo(Tweets) 