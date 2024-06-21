
import React, { useState } from 'react';
import img from '../PAFF_121515_linguisticcuessocialidentity_newsfeature.jpg'
import axios, { AxiosRequestConfig } from 'axios';


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
   
    const [errors, seterrors] = useState<form_error>({
        Name:'',
        UserName:'',
        Email:'',
        password:'',
        confirm_password:''
    })
   
    const [confirm_password, setconfirm_password] = useState('')
    
   const validate = async ()=> {
    console.log('vlidadtion is callled ');
     let errors:form_error={
         Name: '',
         UserName: '',
         Email: '',
         password: '',
         confirm_password:''
     };
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
        console.log(Form_Data,'from data');
        const resp=await axios.post<registeration>('http://localhost:5000/API/auth/register',Form_Data,config);
        console.log(resp,"resp");
        if((await resp).data.success){
        
           console.log("Registration sucessful");            
        }
        
     } catch (error:any) {

        let str=  error.response.data.errors as keyof form_error
         errors[str]=error.response.data.message;
       console.log( errors[str],'error str');
        

     }
   
     return errors;


   }
   const handle = (e:any) => {
    const {name,value}=e.target;
    setForm_Data({...Form_Data,[name]:value})
    
   }
   
   const confirmation =  (e:any) => {
    const {value}=e.target;
    setconfirm_password(value)
    
   }


   const Submit = async (e:any) => {   
    e.preventDefault()  
   const validate_error= await validate();
   if(Object.keys(validate_error).length===0){    
    console.log('no error');

   }else{
    seterrors(await validate_error)
   }
   }
   
  

  return (
   <div className="container "style={{position:'absolute',left:'50%',top:'50%',WebkitTransform:'translate(-50%, -50%)'}}>
     <div className="row  justify-content-center" >
        <div className={`col-md-4 `}>
            <div  style={{display:'grid',placeItems:'center',width:'100%',height:'100%',backgroundColor:'#00affe'}}>
                <h2 style={{position:'absolute',color:'white',marginBottom:'20%'}}>Join Us</h2>
                <img style={{width:'60%',height:'30%'}} src={img} alt="" />
            </div>
            
        </div>
        <div className="col-md-5 " >
            <div style={{marginTop:'4%',marginBottom:'4%'}}><h2>Register</h2></div>
            
            <form action="" method="get" onSubmit={Submit}>
               <div className="mb-2 "><input type="text" name="Name" id="" className={`form-control ${errors.Name?'is-invalid':''}`}placeholder=' Enter Name' value={Form_Data.Name} onChange={handle} />{errors.Name && <div className='invalid-feedback'>{errors.Name}</div> }</div>
               <div className="mb-2 "><input type="text" name="UserName" id="" className={`form-control ${errors.UserName?'is-invalid':''}`} placeholder='Enter User Name'value={Form_Data.UserName}onChange={handle}/>{errors.UserName && <div className='invalid-feedback'>{errors.UserName}</div> }</div>
               <div className="mb-2 "><input type="text" name="Email" id="" className={`form-control ${errors.Email?'is-invalid':''}`}placeholder='Enter Email Address'value={Form_Data.Email} onChange={handle} />{errors.Email && <div className="invalid-feedback">{errors.Email}</div> }</div>
               <div className="mb-2 "><input type="text" name="password" id="" className={`form-control ${errors.password?'is-invalid':''}`} placeholder='Enter password' value={Form_Data.password} onChange={handle}/>{errors.password && <div className="invalid-feedback">{errors.password}</div> }</div>
               <div className="mb-2 "><input type="text" name="Confirm_password" id="" className={`form-control ${errors.confirm_password?'is-invalid':''}`} placeholder='Confirm above Password' onChange={confirmation}/>{errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div> }</div>
               <div className="mb-2 "><input type="submit" value="Register" className="btn btn-dark" /></div>
               <div className="text-center">
               <p className="mb-3">Already registered? <a href="/login">Login here</a></p>
               </div>

            </form>
        </div>
     </div>
   </div>
    
  )
}

export default Register
