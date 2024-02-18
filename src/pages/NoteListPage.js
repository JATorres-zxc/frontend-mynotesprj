import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'


export const NoteListPage = () => {
    let [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes')
        let data = await response.json()
        // console.log('data:', data)
        setNotes(data)
    }
    return (
        <div>
            <div className='notes-list'>
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}/>
                ))}
            </div>
        </div>
    )
}

export default NoteListPage