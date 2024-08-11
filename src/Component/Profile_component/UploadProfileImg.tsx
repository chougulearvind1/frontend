import axios from 'axios';
import Cookies from 'js-cookie';
import React, { ChangeEvent,  useCallback,  useEffect,  useState } from 'react'
import { toast } from 'react-toastify';
import _ from "lodash";
interface UploadProfileImgModal{
  closeModal:(profile:any)=>any,
  userId:string|undefined
}
const UploadProfileImg:React.FC<UploadProfileImgModal> = ({closeModal,userId}) => {
    const tab=-1;
    const token=Cookies.get('token')
    const [ProfileImage, setProfileImage] = useState('')
    const [File, setFile] = useState<File|null>(null)
    
    async function handleImageChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {
        const file = event.target.files?.[0];
      
         if (file && userId) {
                setFile(file)
               const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result as string);
                          console.log(reader.result as string,'profile');                          
                      };
                        reader.readAsDataURL(file);       
    }
    }
    

    
    // const fileInputRef = useRef<HTMLInputElement>(null)   
    const handleUpload = async () => {

         try { 
            if(File){
              const fileArrayBuffer = await File.arrayBuffer(); // Convert file to ArrayBuffer
              // const buffer=Buffer.from(fileArrayBuffer)      
            console.log(userId,'userid');
            
            const response = await axios.post(`http://localhost:5000/API/user/${userId}/uploadProfilePic`, fileArrayBuffer, {
              headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'image/jpeg',
              },
            });
            if(response.status===200){
              toast.success("Profile picture set sucessfully");
              closeModal(ProfileImage)
            }
                  
            

            }else{
              toast.error('you can not upload image without selecting ')
            }
            
          } catch (error) {
            console.error('Error uploading file:', error);
          }      
      };
  //     const debouncedFetchImgurData = _.debounce(handleUpload, 10000);

  //  const handleClick=useCallback(
  //    () => {
  //      debouncedFetchImgurData()
  //    },
  //    [debouncedFetchImgurData],
  //  )
   


  return (
    <div>
        <div className={`modal d-block`} tabIndex={tab} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content"style={{}}>
      <div className="modal-header ">
        <h5 className="modal-title justify-content-between">Edit Profile</h5>
        <button type="button" className="close" onClick={() => { closeModal(ProfileImage) } } aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="container mt-2">
      <div className="alert alert-primary" role="alert">
          Note: The image should be square in shape.
        </div>
      <div>
        <input  className='form-control'
                type="file"
                accept="image/*"
                id="upload-photo"
                style={{  }}
                onChange={handleImageChange}
            />                               
                                
      </div>
      <img src={ProfileImage} alt='' className="square-img img-thumbnail"/>
    </div>     
    
      </div>
      <div className="modal-footer">
      <button   onClick={handleUpload} className="btn btn-outline-primary">Upload </button>
        <button type="button" className="btn btn-secondary" onClick={() => { closeModal(ProfileImage)}} >Close</button>
        
      </div>
    </div>
  </div>
</div>
        
    </div>
  )
}

export default UploadProfileImg

