import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <div>
    <nav className='Navbar'>
      <div className='NavbarLink'>
        <NavLink to="/" className="Logo"><img src={logo} alt="logo" className='Logo'/></NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
    <main>
        <Outlet/>
    </main>
    </div>
  )
}

export default Navbar