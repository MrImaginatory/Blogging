import React, { useState } from 'react'
import '../styles/Signup.css'
import { Link } from 'react-router-dom'
const Signup = () => {

  const [data, setData] = useState({
    userName:"",
    emailId:"",
    password:"",
  })

  const handleChange = (event) =>{
    setData((prev)=>({...prev,[event.target.name]:event.target.value}))
  }

  console.log(data);

  const handleSubmit = (e) =>{
    e.preventDefault();
  }

  return (
    <div className="Signup-container">
      <div className='Signup-form-container'>
        <form onSubmit={handleSubmit}>
          <h2>Create an Account</h2>
            <label htmlFor='userName'>Username :</label>
            <input type='text' name='userName' id='userName' placeholder='Enter Your Username...'onChange={handleChange}/>
            <label htmlFor='emailId'>Email Id:</label>
            <input type='email' name='emailId' id='emailId' placeholder='Enter Your Email...'onChange={handleChange}/>
            <label htmlFor='Password'>Password:</label>
            <input type='password' name='Password' id='Password' placeholder='Enter Your Password...'onChange={handleChange}/>
            <a href="" className='forgotPassword'>Forgot Your Password?</a>
            <input type='submit' value="Create Account" />
            <Link to="/login" className='loginHref'>Already Have an Account?</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup