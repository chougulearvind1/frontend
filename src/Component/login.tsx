import React, { useState } from 'react'
import img from '../PAFF_121515_linguisticcuessocialidentity_newsfeature.jpg'
import axios, {  AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'


interface form_error{
  UserName:string,
  password:string
}
interface form_data{
  UserName:string,
  password:string
}

function Login() {

    const [Errors, setErrors] = useState<form_error>({
      UserName:'',password:''
    })
    const [Form_Data, setForm_Data] = useState<form_data>({
      UserName:'',password:''
    })

    const validate = async () => {
      let errors:form_error={
       UserName:'',password:'' 
      }
      if(!Form_Data.UserName)errors.UserName='User Name or Email is required'
      if(!Form_Data.password)errors.password='password required'
      console.log(Form_Data,'form data');
      const config:AxiosRequestConfig={
        headers:{
          "Content-Type":"application/json"
        }
      }
      
      try {
        const resp=await axios.post('http://localhost:5000/API/auth/login',Form_Data,config)
      if(await resp.data.success){
        Cookies.set('token',resp.data.token ,{expires:1})
        Cookies.set('Name',resp.data.Name ,{expires:1})
        Cookies.set('UserName',resp.data.UserName ,{expires:1})
        Cookies.set('id',resp.data.id,{expires:1})


        const value=Cookies.get('token')
         const value1=Cookies.get('Name')
          const value2=Cookies.get('UserName')
        console.log('Logged in ',value,value1,value2);
      }
      } catch (error:any) {
        console.log(error);
        let str=error.response.data.error as keyof form_error;
        Errors[str]=error.response.data.message
      }
        return errors;
    }

    const Submit = async (e:any) => {
        e.preventDefault();
        const validate_error= await validate() 
        console.log(validate_error,'validator error');

        if(Object.keys(validate_error).length===0){
          console.log('no error')
        }else{
          setErrors(await validate_error)
        }
    }
    const handle = (e:any) => {
      const {value,name}=e.target;
      setForm_Data({...Form_Data,[name]:value})
      console.log(Form_Data,'handle form data ');
    }

  return (
    <div className="container "style={{position:'absolute',left:'50%',top:'50%',WebkitTransform:'translate(-50%, -50%)'}}>
     <div className="row  justify-content-center" >
        <div className={`col-md-4 `}>
            <div  style={{display:'grid',placeItems:'center',width:'100%',height:'100%',backgroundColor:'#00affe'}}>
                <h2 style={{position:'absolute',color:'white',marginBottom:'20%'}}>Welcome Back</h2>
                <img style={{width:'60%',height:'30%'}} src={img} alt="" />
            </div>
            
        </div>
        <div className="col-md-5 " >
            <div style={{marginTop:'4%',marginBottom:'4%'}}><h2>Login</h2></div>
            
            <form action="" method="" onSubmit={Submit}>
               <div className="mb-2 "><input type="text" name="UserName" id="" className={`form-control ${Errors.UserName?'is-invalid':''}`} placeholder='Enter User Name'value={Form_Data.UserName}onChange={handle}/>{Errors.UserName && <div className='invalid-feedback'>{Errors.UserName}</div> }</div>
               <div className="mb-2 "><input type="text" name="password" id="" className={`form-control ${Errors.password?'is-invalid':''}`} placeholder='Enter password' value={Form_Data.password} onChange={handle}/>{Errors.password && <div className="invalid-feedback">{Errors.password}</div> }</div>
               <div className="mb-2 "><input type="submit" value="Register" className="btn btn-dark" /></div>
               <div className="text-center">
               <p className="mb-3">Not registered? <a href="/Register">Register here</a></p>
               </div>

            </form>
        </div>
     </div>
   </div>
  )
}

export default Login