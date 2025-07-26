import React from 'react'
import './Header.css'
import Logo from '../images/Pasteifylogo.png'

const Header = () => {
  return (
    <div>
        <img src={Logo} alt='Pasteify-Logo'/>
    </div>
  )
}

export default Header