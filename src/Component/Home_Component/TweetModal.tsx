import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, {  ReactNode, useRef, useState } from 'react'

interface Modal_props{
  show:boolean,
  closeModal:()=>void,  
  children?:ReactNode
}

const TweetModal:React.FC<Modal_props>= ({show,closeModal}) => {
  const [file, setFile] = useState<File|null>(null);
  const [PreviewUrl, setPreviewUrl] = useState<string|null>(null)
  const [Content, setContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement|null>(null);
  const token=Cookies.get('token')

  const HandleIconClick = () => { if (fileInputRef.current) {
    fileInputRef.current.click()
  } }
  
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

    const handleBlur = (e:React.FocusEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);

    }
    
    const handleUpload = async () => {
      // if(!file){return }
      const formdata=new FormData();
      formdata.append('content',Content)
      if(file){
        formdata.append('image',file)
      }
      
     
      try {
        console.log(formdata,'formdata');
        formdata.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const config={
          headers:{  
            'Content-Type': 'multipart/form-data',
             'Authorization': `Bearer ${token}`
            }
          }
        const resp= await axios.post('http://localhost:5000/API/tweet/',formdata,config)
        console.log('file uploaded sucessfully',resp.data);
      } catch (error) {
        console.error('Error uploading file',error);
        
      }
    }
  
    const tab=-1;
   
  return (
     
    <div>
      <div className={`modal ${show?'d-block':'d-none'}`} tabIndex={tab} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header ">
        <h5 className="modal-title justify-content-between">New Tweet</h5>
        <button type="button" className="close" onClick={closeModal} aria-label="Close">
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
     {PreviewUrl && (
        <div>
          <img src={PreviewUrl} alt="Selected file" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
     {/* {File && <button  className="btn btn-primary">Upload</button>} */}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleUpload}>Tweet</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal"onClick={closeModal}>Close</button>
      </div>
    </div>
  </div>
</div>

        
    </div>
  )
}

export default TweetModal