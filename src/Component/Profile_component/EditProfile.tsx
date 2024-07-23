import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar3, GeoAlt, Person } from 'react-bootstrap-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface EditProfileModal{
  closeModal:()=>any
}

const EditProfile:React.FC<EditProfileModal>=({closeModal})=> {
    const tab=-1
    const [Name, setName] = useState<string>('')
    const [DateOfBirth, setDateOfBirth] = useState<any>()
    const [location, setLocation] = useState<any>('')
    const token = Cookies.get('token')
    const userId=Cookies.get('id')

    
    const handleUpload = async () => {
        try {
          const fromData={Name,location,DateOfBirth}
      const resp=await axios.put(`http://localhost:5000/API/user/${userId}/`,fromData,{headers:{Authorization:`Bearer ${token}`}})
      console.log(resp.data);
      toast.success(resp.data.message)
      closeModal()
    } catch (error) {
      console.error(error);
      
    }
    }

  return (
    <div>
        <div className={`modal d-block`} tabIndex={tab} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content"style={{width:'70%'}}>
      <div className="modal-header ">
        <h5 className="modal-title justify-content-between">Edit Profile</h5>
        <button type="button" className="close" onClick={closeModal} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="container mt-2">
      <form>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">Name</label>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              id="Name" 
              value={Name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name"
            />
            <span className="input-group-text"><Person /></span>
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Enter your location"
            />
            <span className="input-group-text"><GeoAlt /></span>
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="DateOfBirth" className="form-label">Date of Birth</label>
          <div className="input-group">
            <div className="form-control">
              <DatePicker
              selected={DateOfBirth}
              onChange={(date: any) => setDateOfBirth(date)}
              className="form-control"
              id="DateOfBirth"
              placeholderText="Select your date of birth"
            />
            </div>
            
            <span className="input-group-text"><Calendar3 /></span>
          </div>
        </div>
      </form>
    </div>     
    
      </div>
      <div className="modal-footer">
      <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault();handleUpload() }}>Edit</button>
        <button type="button" className="btn btn-secondary" onClick={closeModal} >Close</button>
        
      </div>
    </div>
  </div>
</div>
        
    </div>
  )
}



export default EditProfile
