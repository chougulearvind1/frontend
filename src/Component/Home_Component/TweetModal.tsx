import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, {  ReactNode, useRef, useState } from 'react'
import { toast } from 'react-toastify';

interface Modal_props{
  show:boolean,
  closeModal:(tweet:any)=>void,  
  children?:ReactNode
}

const TweetModal:React.FC<Modal_props>= ({show,closeModal}) => {
  const [file, setFile] = useState<File|null>(null);
  const [PreviewUrl, setPreviewUrl] = useState<string>('')
  const [Content, setContent] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement|null>(null);
  const token=Cookies.get('token')  
 
  const HandleIconClick = () => { if (fileInputRef.current) {
    fileInputRef.current.click()
  } }
  // get first image file  and read  it 
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const selectedFile=e.target.files[0]
      setFile(selectedFile)
      const reader=new FileReader();
      reader.onloadend=()=>{
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  // element is triggered when the textarea loses focus
    const handleBlur = (e:React.FocusEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
  }
    
  const handleUpload = async () => {
    const formdata=new FormData();
    formdata.append('content',Content)
      if(file){
        formdata.append('image',file)
      }    
      try {
        
        formdata.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const config={
          headers:{  
            'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`
            }
          }
        const resp= await axios.post('http://localhost:5000/API/tweet/',formdata,config);       
         if (await resp.status===200) {        
            console.log(resp.data,'tweetmodal data');
           toast.success(resp.data.message)
           closeModal(await resp.data.Tweet);
          } 
      } catch (error) {
        console.log(error,'error');
         if(axios.isAxiosError(error)){
          toast.error(error.response?.data.message)
         }
      }
    }
  
    const tab=-1;
    
  return (
    // Clicking on the tweet button will open this dialog

    <div>
      <div className={`modal ${show?'d-block':'d-none'}`} tabIndex={tab} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header ">
        <h5 className="modal-title justify-content-between">New Tweet</h5>
        <button type="button" className="close" onClick={() => { closeModal('')}} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <textarea className="form-control" rows={3} onBlur={handleBlur} placeholder="What's happening?" />
      <input
        type="file"
        id="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button className="btn btn-link"onClick={HandleIconClick}>
                <FontAwesomeIcon style={{fontSize:'40px'}}  icon={faImage } flip='both' />
     </button>
     {/* selected image preview shown here */}
     {PreviewUrl && (
        <div>
          <img src={PreviewUrl} alt="Selected file" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
     {/* {File && <button  className="btn btn-primary">Upload</button>} */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleUpload}>Tweet</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal"onClick={() => { closeModal('') }}>Close</button>
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}

export default TweetModal