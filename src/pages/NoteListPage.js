import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


export const NoteListPage = () => {
    let [notes, setNotes] = useState([]) // state to store notes

    useEffect(() => {
        getNotes() //fetch notes from api(hook to perform side effectss of component)
    }, [])

    // function to fetch notes from api
    let getNotes = async () => {
        let response = await fetch('/api/notes')
        let data = await response.json()
        // console.log('data:', data)
        setNotes(data)
    }
    // this is what you see in the home page
    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>
                    &#9782; Notes
                </h2>
                <p className='notes-count'>{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.map((note, index) => (
                    <ListItem key={index} note={note}/>
                ))}
            </div>
            < AddButton />
        </div>
    )
}

export default NoteListPage