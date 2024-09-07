 
import React, { useState } from 'react';
import img from '../PAFF_121515_linguisticcuessocialidentity_newsfeature.jpg'
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

//
interface form_error{
    Name:string;
    UserName:string,
    Email:string,
    password:string,
    confirm_password:string

}
interface Form_Data{
    Name:string;
    UserName:string,
    Email:string,
    password:string,
}

interface registeration{
    success:boolean,
    message:string,
    
}
function Register() {
   
   const [Form_Data, setForm_Data] = useState<Form_Data>({
    Name:'',
    UserName:'',
    Email:'',
    password:''
    
   })
   
    const [errors, seterrors] = useState<form_error|null>({
        Name:'',
        UserName:'',
        Email:'',
        password:'',
        confirm_password:''
    })
   
    const [confirm_password, setconfirm_password] = useState('')
    const Navigate=useNavigate() ;
    //  Here we cheacks  validation  of feild on client side before send
   const validate = async ()=> {
     let errors:form_error={
         Name: '',
         UserName: '',
         Email: '',
         password: '',
         confirm_password:''
     };
    //  validate data  at client side and set all error in erros object
     if(!Form_Data.Name) errors.Name=' Name is required ';
     if(!Form_Data.UserName)errors.UserName='user Name is required';
     if(!Form_Data.Email)errors.Email='Email Address is required'
     if(!Form_Data.password)errors.password='password required'
     if(!(Form_Data.password===confirm_password)|| !Form_Data.password) errors.confirm_password='Both password not same'
     try {
        const config:AxiosRequestConfig={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const resp=await axios.post<registeration>('https://backend-3j4k.onrender.com/API/auth/register',Form_Data,config);
         
        if((await resp).data.success){
        
          toast.success(resp.data.message) 
          
          Navigate('/login')
                
        }
        
     } catch (error:any) {

      toast.error(error.response.data.message)
        

     }
   
     return errors;


   }
 
   
   const handle = (e:any) => {
    const {name,value}=e.target;
    setForm_Data({...Form_Data,[name]:value.trim()})
    
   }
   
   const confirmation =  (e:any) => {
    const {value}=e.target;
    setconfirm_password(value.trim())
    
   }


   const Submit = async (e:any) => {   
    e.preventDefault()  
   const validate_error= await validate();
   if(Object.keys(validate_error).length===0){    
   seterrors(null);
   }else{
    seterrors(await validate_error)
   }
   }
   
   
    //registratin feild and two  card combine under card groups    
  return (
   <div className=" d-flex justify-content-center"style={{marginRight:'auto',marginLeft:'auto',paddingRight:'15px',paddingLeft:'15px',alignItems:'center',width:'95vw',height:'95vh'}}>
     <div className="row  justify-content-center" > 
        <div className="card-group">
            <div className="card text-white py-5"style={{background:'#00affe'}}>
            <div className="card-body text-center d-flex justify-content-center align-items-center flex-column">
                    <h2 >Join Us</h2>
                    <img className='img-fluid' style={{maxWidth:'50%'}} src={img} alt="" />          
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <h2>Register</h2>

                <form action="" method="get" onSubmit={Submit}>
               <div className="mb-3 input-group "><span className="input-group-text"><i className="fa fa-user"></i></span><input type="text" name="Name" id="" className={`form-control ${errors?.Name && errors.Name?'is-invalid':''}`}placeholder=' Enter Name' value={Form_Data.Name} onChange={handle} />{errors?.Name && errors.Name && <div className='invalid-feedback'>{errors.Name}</div> }</div>
               <div className="mb-3 input-group "><span className="input-group-text"><i className="fa fa-id-badge"></i></span><input type="text" name="UserName" id="" className={`form-control ${errors?.UserName && errors.UserName?'is-invalid':''}`} placeholder='Enter User Name'value={Form_Data.UserName}onChange={handle}/>{errors?.UserName && errors.UserName && <div className='invalid-feedback'>{errors.UserName}</div> }</div>
               <div className="mb-3 input-group "><span className="input-group-text"><i className="fa fa-envelope"></i></span><input type="text" name="Email" id="" className={`form-control ${errors?.Email &&  errors.Email?'is-invalid':''}`}placeholder='Enter Email Address'value={Form_Data.Email} onChange={handle} />{errors?.Email && errors.Email && <div className="invalid-feedback">{errors.Email}</div> }</div>
               <div className="mb-3 input-group "><span className="input-group-text"><i className="fa fa-lock"></i></span><input type="text" name="password" id="" className={`form-control ${errors?.password && errors.password?'is-invalid':''}`} placeholder='Enter password' value={Form_Data.password} onChange={handle}/>{errors?.password && errors.password && <div className="invalid-feedback">{errors.password}</div> }</div>
               <div className="mb-3 input-group "><span className="input-group-text"><i className="fa fa-lock"></i></span><input type="text" name="Confirm_password" id="" className={`form-control ${errors?.confirm_password && errors.confirm_password?'is-invalid':''}`} placeholder='Confirm above Password' onChange={confirmation}/>{errors?.confirm_password && errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div> }</div>
               <div className="mb-3 input-group ">   <button type="submit" className="btn btn-primary px-4">Register</button></div>
               <div className="text-center">
               <p className="mb-3">Already registered? <a href="/login">Login here</a></p>
               </div>

            </form>
            </div>
        </div>
        </div>
        
        
     </div>
   </div>
    
  )
}

export default Register
