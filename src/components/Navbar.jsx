import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='container'>
        <NavLink className='links' to='/'>Home</NavLink>
        <NavLink className='links' to='/pastes'>Pastes</NavLink>
    </div>
  )
}

export default Navbar