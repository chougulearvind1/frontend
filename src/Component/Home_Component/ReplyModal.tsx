import axios from 'axios';
import Cookies from 'js-cookie';
import React, {  memo, ReactNode,  useState } from 'react'
import { toast } from 'react-toastify';

interface Modal_props{
  show:boolean,  
  closeModal:(ReplyCount:any)=>any,
  id:string,
  children?:ReactNode
}


const ReplyModal:React.FC<Modal_props>= ({show,closeModal,id}) => {
  
  const [Content, setContent] = useState('');
  
  
  const token=Cookies.get('token')



    const handleBlur = (e:React.FocusEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);

    }
    
    const handleUpload = async () => {
     
      const formdata=new FormData();
      formdata.append('content',Content)
      formdata.append('tweetId',id)
     
     
      try {
        
        const config={
          headers:{  
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
            }
          }
          console.log('abcd');
        const resp= await axios.post(`http://localhost:5000/API/tweet/${id}/reply/`,formdata,config)
        
        console.log(resp.data.ReplyCount,'reply count');
           toast.success(resp.data.message)
           closeModal(resp.data.ReplyCount);

      
        
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error.response?.data.message)
        }      
        
      }
    }
  
    const tab=-1;
    
  return (
     
    <div>
      <div className={`modal ${show?'d-block':'d-none'}`} tabIndex={tab} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header ">
        <h5 className="modal-title justify-content-between">Tweet your reply</h5>
        <button type="button" className="close" onClick={closeModal} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <textarea className="form-control" rows={3} onBlur={handleBlur} placeholder="What's happening?" />
     
    
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" onClick={handleUpload}>Tweet</button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
        
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}

export default memo(ReplyModal) 