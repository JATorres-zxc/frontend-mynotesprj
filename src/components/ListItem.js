import React from 'react'
import {Link} from 'react-router-dom'


// function to get title from notebody
// which is basically the 35 first character in notebody
let getTitle = (note) => {
    let title = note.body.split('\n')[0]

    if (title.length > 35) {
        return title.slice(0, 35)
    }
    return title
}

// for update time
let getTime = (note) => {
    return new Date(note.updated).toLocaleDateString()
}

// to get content fromm notebody
// basically the one under the title then if 35+ just show ... at the end
let getContent = (note) => {
    let title = getTitle(note)
    let content = note.body.replaceAll('\n', '')
    content = content.replaceAll(title, '')

    if (content.length > 35){
        return content.slice(0, 35) + '...'
    } else{
        return content
    }
}

// to show the list item which is list of note
const ListItem = ({note}) => {
    return (
    <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
            <h3>{getTitle(note)}</h3>
            <p><span>{getTime(note)}</span>{getContent(note)}</p>
        </div>
    </Link>
    )
}

export default ListItem