import React, { useEffect, useState } from 'react';
import { useParams, Link, json, useNavigate } from "react-router-dom";
import { ReactComponent as Arrowleft} from '../assets/arrow-left.svg'

const NotePage = () => {
    const navigate = useNavigate(); 
    let params = useParams();
    let [note, setNotes] = useState(null);

    useEffect(() => {
        getNote();
    }, [params.id]);

    let getNote = async () => {
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

    let updateNote = async () => {
        fetch(`/api/notes/${params.id}/update/`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    };


    let deleteNote = async () => {
        fetch(`/api/notes/${params.id}/delete/`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        navigate('/');
    }

    let handleSubmit = () =>{
        updateNote();
        navigate('/');
    };




    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Arrowleft onClick={handleSubmit}/>
                </h3>
                <button onClick={deleteNote}>Delete</button>
            </div>
            <textarea onChange={(e) => {setNotes({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
