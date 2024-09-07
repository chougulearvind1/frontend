import  { useState } from 'react'
import img from '../PAFF_121515_linguisticcuessocialidentity_newsfeature.jpg'
import axios, {  AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


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
     const Navigate=useNavigate();


     // validate  userName  and password
    const validate = async () => {
      let errors:form_error={
       UserName:'',password:'' 
      }
      if(!Form_Data.UserName)errors.UserName='User Name or Email is required'
      if(!Form_Data.password)errors.password='password required'
      const config:AxiosRequestConfig={
        headers:{
          "Content-Type":"application/json"
        }
      }
      
      try {
        const resp=await axios.post('https://backend-3j4k.onrender.com/API/auth/login',Form_Data,config)
        // if request is sucessfull set the cookies
      if(await resp.data.success){
        Cookies.set('token',resp.data.token ,{expires:1})
        Cookies.set('Name',resp.data.Name ,{expires:1})
        Cookies.set('UserName',resp.data.UserName ,{expires:1})
        Cookies.set('id',resp.data.id,{expires:1})
        //if login sucessful then navigate to Home
        // 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
        if(resp.status===200){
        
          Navigate('/Home')
        }
        toast.success(resp.data.message)

      }
      } catch (error:any) {
        toast.error(error.response.data.error)
        
      }
        return errors;
    }
    
    const Submit = async (e:any) => {
        e.preventDefault();
        const validate_error= await validate() 

        if(Object.keys(validate_error).length!==0){     
          setErrors( validate_error)
        }
    }
    const handle = (e:any) => {
      const {value,name}=e.target;
      setForm_Data({...Form_Data,[name]:value.trim()})
    }
    const styles = {
      container: {
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingRight: '15px',
        paddingLeft: '15px',
        alignItems: 'center',
        width:'95vw',
        height:'95vh',
        overflow:'clip'
   
        
      
      }
    }

  return (
    <div style={styles.container} className="row justify-content-center col-md- ">
     <div style={{width:'auto'}} className="row  justify-content-center " >
      <div className="card-group">
        <div className="card text-white  py-5 " style={{backgroundColor:'#00affe'}}>
          <div className="card-body text-center">
                <h2 >Welcome Back</h2>
                <img className="img-fluid" style={{maxWidth:'50%', height:'50%'}} src={img} alt="" />
          </div>   
        </div>
        <div className="card">
          <div className="card-body">
            <h1>
              Login
            </h1>
            <p className="text-muted">
            Sign In to your account
            </p>   
            
            <form action="" method="" onSubmit={Submit}>

              <div className="input-group mb-3">
                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                    <input type="text" name="UserName" id="" className={`form-control ${Errors.UserName?'is-invalid':''}`} placeholder='Enter User Name'value={Form_Data.UserName}onChange={handle}/>{Errors.UserName && <div className='invalid-feedback'>{Errors.UserName}</div> }
                </div>
               <div className="input-group mb-3">
                  <span className="input-group-text"><i className="fa fa-lock"></i></span>
                  <input type="text" name="password" id="" className={`form-control ${Errors.password?'is-invalid':''}`} placeholder='Enter password' value={Form_Data.password} onChange={handle}/>{Errors.password && <div className="invalid-feedback">{Errors.password}</div> }
                </div>
                
                <div className="row">
                <div className="col-6">
                  <button type="submit" className="btn btn-primary px-4">Login</button>
                </div>
                <div className="col-6 text-right">
                <p className="mb-3">Not registered? <a href="/Register">Register here</a></p>
                </div>
              </div>         

            </form>
        </div>
          
         
        </div>
      </div>
        
        
        
     </div>
   </div>
  )
}

export default Login  