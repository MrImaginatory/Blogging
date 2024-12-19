import React, { useState } from 'react'
import '../styles/SignUp.css'
const Signup = () => {

    const [data,setData] = useState({
        emailId:'',
        password:'',
    })

    const handleChange = (e) =>{
        setData((prev)=>({...prev,[e.target.name]:e.target.value}))
        console.log(data);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }

  return (
    <div className="formContainer">
    <form className="Form">
      <h3>Signup into your <br/> Account</h3>
      <label htmlFor="emailId">Email: </label>
      <input type="email" name="emailId" id="emailId" onChange={handleChange}/>
        <br/>
       <label htmlFor="Password">Password: </label>
      <input type="password" name="password" id="Password" onChange={handleChange}/>
        <br/><br/>
       <button type="submit">SignUp</button>
    </form>
  </div>
  )
}

export default Signup