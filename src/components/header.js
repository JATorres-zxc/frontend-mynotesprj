import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='app-header'>
            <h1><Link to='/'>Note List</Link></h1>
            <span>   </span>
            <Link to='/login'>Login</Link>
            
        </div>
    )
}

export default Header