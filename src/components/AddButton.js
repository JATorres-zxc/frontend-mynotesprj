import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon} from '../assets/add.svg'


const addButton = () => {
    return (
        // link to new note route with button
        <Link to='/note/new' className='floating-button'>
            <AddIcon/>
        </Link>
    )
}

export default addButton