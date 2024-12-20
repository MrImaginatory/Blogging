import React, { useState } from 'react'
import '../styles/Login.css'
import { Link } from 'react-router-dom'
const Login = () => {

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  const [data, setData] = useState({
    emailId:"",
    password:"",
  })

  const handleChange = (event) =>{
    setData((prev)=>({...prev,[event.target.name]:event.target.value}))
  }

  console.log(data);


  return (
    <div className="Login-container">
      <div className='Login-form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Log into your Account</h2>
            <label htmlFor='emailId'>Email Id:</label>
            <input type='email' name='emailId' id='emailId' placeholder='Enter Your Email...' onChange={handleChange}/>
            <label htmlFor='Password'>Password:</label>
            <input type='password' name='Password' id='Password' placeholder='Enter Your Password...' onChange={handleChange}/>
            <a href="" className='forgotPassword'>Forgot Your Password?</a>
            <input type='submit' value="Create Account" />
            <Link to="/signup" className='loginHref'>Didn't Have an Account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login