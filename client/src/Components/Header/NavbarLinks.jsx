import React from 'react'
import { Link } from 'react-router-dom'

const NavbarLinks = () => {
  return (
    <div className='flex gap-5'>
        <Link to='/whyUs' className='text-white'>Why Us</Link>
        <Link to='/pricing' className='text-white'>Pricing</Link>
    </div>
  )
}

export default NavbarLinks