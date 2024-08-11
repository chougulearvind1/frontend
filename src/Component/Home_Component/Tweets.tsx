

import React, { memo, MouseEventHandler, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRetweet,faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart,faComments, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import axios  from 'axios';
import Cookies from 'js-cookie';
import ReplyModal from './ReplyModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Tweets_props{
  TweetData:any,
 DelTweet ?:(TweetforDelete: any) => void;
}
const Tweets:React.FC<Tweets_props> = ({TweetData,DelTweet}) => { 
  const [Tweet] = useState<any>(TweetData)        
  const token=Cookies.get('token') 
  const userId=Cookies.get('id')  
  const [IsLiked, setIsLiked] = useState()
  const [LikeCount, setLikeCount] = useState('')
  const [ShowModal, setShowModal] = useState(false) 
  const [ReTweetCount, setReTweetCount] = useState<any>()
  const [ReplyCount, setReplyCount] = useState<any>()
  const [ReTweet, setReTweet] = useState<any>()
  const [DeleteTweetIconShowOrNot, setDeleteTweetIconShowOrNot] = useState<boolean>()
  const [DeleteTweet, setDeleteTweet] = useState<boolean>(false)



  const OpenModal = () => {
   setShowModal(true)   
  }
  const close = (ReplyCount1:any) => {    
     if(typeof ReplyCount1==='number'){
      setReplyCount(ReplyCount1)
     } 
    setShowModal(false);      
  }

    
      const handleReTweet = async () => {
        try {
          const resp=await axios.post(`https://backend-3j4k.onrender.com/API/tweet/${Tweet?._id}/retweet`,{},{headers:{Authorization:`Bearer ${token}`}})
          setReTweet(resp.data)
          setReTweetCount(resp.data.count)
          toast.success(resp.data.message)
        } catch (error) {
          console.error(error);
          
        }
      }
        
      const handleLike = async () => {
        try {
          const resp=await axios.post(`https://backend-3j4k.onrender.com/API/tweet/${Tweet?._id}/like`,{},{headers:{Authorization:`Bearer ${token}`}})
          toast.success(resp.data.message)
          setIsLiked( resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)

        } catch (error) {          
            if(axios.isAxiosError(error)){
              toast.error(error.response?.data)
            }          
        }      }
      const handleDisLike = async () => {
        try {
          const resp=await axios.post(`https://backend-3j4k.onrender.com/API/tweet/${Tweet?._id}/dislike`,{},{headers:{Authorization:`Bearer ${token}`}})
          toast.success(resp.data.message)
          setIsLiked( resp.data.IsLike);
          setLikeCount(resp.data.LikeCount)
        } catch (error) {
          if(axios.isAxiosError(error))
          {
            toast.error(error.response?.data.message)
          }          
        }
      }   
        // https://backend-3j4k.onrender.com/callback
        // fc895140db70f850c6260df5162560c19ac7980e
        // cd05a7d8c4ed800
        const navigate=useNavigate()
      const openProfile = (userId:any) => {
        navigate(`/profile/${userId}`,{ state: { userId } })
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
              setReplyCount(Tweet?.replies?.length)
              if(Tweet.tweetedBy._id===userId){
                  setDeleteTweetIconShowOrNot(true)
              }else{
                setDeleteTweetIconShowOrNot(false)
              }
             
                                   
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[])   
          useEffect(() => {
            async function DeleteTweetFuncion() {
              try {
                
                const resp=await axios.delete(`https://backend-3j4k.onrender.com/API/tweet/${Tweet._id}`,{headers:{Authorization:`Bearer ${token}`}})
                
                toast.success(resp.data.message)
                if(resp.status===200){
                  if(DelTweet){                   
                    DelTweet(Tweet._id)
                  }                
                }    
              } catch (error) {
                
                  if(axios.isAxiosError(error)){
                    toast.error(error.response?.data)
                  }                
              }
            }            
            if(DeleteTweet){             
                DeleteTweetFuncion()
            }    
            
          }, [DelTweet, DeleteTweet, Tweet, Tweet._id, token])
                
    const StopPropagation:MouseEventHandler<HTMLDivElement> = (event:React.MouseEvent<HTMLElement>) => { 
      event.stopPropagation()
     }    
    
    const cardClick = (Tweets: any) => {
      console.log(Tweets,'selected tweet');
      navigate(`/Tweets`,{ state: { Tweets }})
    }

  return (
    <div>
          <ReplyModal show={ShowModal} closeModal={close} id={Tweet._id}></ReplyModal> 
          
         
        <div className="card " style={{backgroundColor:'#ffffff'}} onClick={() => { cardClick(Tweet) }} onMouseEnter={(e:any) => {e.currentTarget.style.backgroundColor= '#c0deed' }} onMouseLeave={(e:any) => {e.currentTarget.style.backgroundColor= '#ffffff' }} >
             {ReTweet  && ( <div>
                  <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'20px'}} /> 
                  <span>Retweeted by {ReTweet.ReTweetUser}</span>                 
               </div> )}
               {Tweet.ReTweetUser  && ( <div>
                  <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'20px'}} /> 
                  <span>Retweeted by {Tweet.ReTweetUser}</span>                 
               </div> )}
            <div className="d-flex" style={{flexDirection:'row'}}>
                          <div style={{}} className='col-auto'>
                            <img style={{width:'70px',height:'70px',margin:'5px'}} src={`https://raw.githubusercontent.com/chougulearvind1/images/main/img/${Tweet?.tweetedBy?.profle_picture?.filename}`} alt="" className="rounded-circle mr3" />
                        </div>
                        <div className='col p-1 pt-2'>
                        
                          <div className="  d-flex align-item-center flex-wrap">               
                            <h4 onClick={(event:any) => { StopPropagation(event); openProfile(Tweet.tweetedBy._id)} } className="mb-0">@{Tweet?.tweetedBy?.UserName}</h4>
                            <small style={{margin:'auto 0',paddingLeft:'10px',fontSize:'large'}} className="text-muted"> - {new Date(Tweet?.createdAt).toLocaleString('en-US',{weekday: 'long',month: 'long',day: 'numeric',year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</small>
                                      
                        </div>
                        <div className="card-body" style={{paddingBottom:'0'}}>
                          <p style={{fontSize:'larger'}} className="">{Tweet?.content}</p> 
                          {Tweet?.image &&  (<img src={`https://raw.githubusercontent.com/chougulearvind1/images/main/tweets/${Tweet?.image}`} className="card-img-top" alt="Card"></img>)}
                         
                                

                        </div>

                        {DeleteTweetIconShowOrNot && (<div onClick={(event:any) => { StopPropagation(event); setDeleteTweet(true)}}style={{ top: '10px', right: '10px' ,position:'absolute',cursor:'pointer'}}>
                        <FontAwesomeIcon icon={faTrashCan} style={{color: "#000000",}} size={'lg'}/>
                        </div>)}
                        
                        <div className="d-flex justify-content-around" >
                            {
                              IsLiked?
                            <button className="btn btn-link" onClick={(event:any) => { StopPropagation(event); handleDisLike()}}>
                                <FontAwesomeIcon icon={solidHeart } style={{fontSize:'25px',color:'red'}}/> <span>{ LikeCount} </span>
                            </button>

                            :
                            <button className="btn btn-link" onClick={(event:any) => { StopPropagation(event); handleLike()}}  >

                                <FontAwesomeIcon icon={regularHeart} style={{fontSize:'25px',color:'red'}}/> <span> {LikeCount}  </span>
                            </button>
                            
                            }
                              
                          <button className="btn btn-link" onClick={ (event:any) => { StopPropagation(event); OpenModal()}}>
                            <FontAwesomeIcon icon={faComments} style={{fontSize:'25px'}}/>
                            <span>{ReplyCount}</span>
                          </button>
                          <button className="btn btn-link" onClick={(event:any) => { StopPropagation(event); handleReTweet()}}>
                            <FontAwesomeIcon icon={faRetweet} style={{color:'green',fontSize:'25px'}} /> 
                            <span>{ReTweetCount}</span>

                          </button>
                            <div className=' invisible'>
                              dummy
                            </div>
                        </div>              
                    
                    
                    <div className=''>
                    
                    {/* { Tweet.replies  && (
                      <div>
                        {/* {Replies &&  Replies.map((reply:any)=>(<Tweets key={reply._id} tweet_data={reply} userId={userId}></Tweets>))} 
                        {Tweet.replies.every((item: any)=>typeof item=='object') &&  Tweet.replies.map((reply:any,index:any)=>(
                            <div  key={Date()+index}>
                              <Tweets key={Date()+index} TweetData={reply} userId={userId} ></Tweets>
                            </div> ))}                

                      </div>
                  )}
                     */}
                    </div>        
                    </div>
            </div>
           
        </div>
        <style>
              {`.btn-link:hover{
                 background-color:#1dcaff
              }`}
        </style>

    </div>
  )

  
}

export default memo(Tweets) 