import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Arrowleft} from '../assets/arrow-left.svg'

const NotePage = () => {
    const navigate = useNavigate(); 
    let params = useParams();
    let [note, setNotes] = useState(null);

    let getNote = async () => {
        if (params.id === 'new') return
        try {
            let response = await fetch(`/api/notes/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch note');
            }
            let data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    useEffect(() => {
        getNote();
    }, [params.id,getNote]);

    let updateNote = async () => {
        fetch(`/api/notes/${params.id}/`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    };


    let deleteNote = async () => {
        fetch(`/api/notes/${params.id}/`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        navigate('/');
    }

    let createNote = async () => {
        fetch(`/api/notes/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    };



    let handleSubmit = () =>{
        if(params.id !== 'new' && !note.body){
            deleteNote()
        } else if(params.id !== 'new'){
            updateNote();
        } else if(params.id === 'new' && note.body !== null){
            createNote()
        }
        navigate('/');
    };



    let handleChange = (value) => {
        setNotes(note => ({...note, 'body':value}))
    }



    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Arrowleft onClick={handleSubmit}/>
                </h3>
                {params.id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ):(
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
