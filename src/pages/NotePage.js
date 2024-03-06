import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Arrowleft} from '../assets/arrow-left.svg'


// component for single note page
const NotePage = () => {
    const navigate = useNavigate(); // hook for navigating between pages
    let params = useParams(); // route parameters
    let [note, setNotes] = useState(null); // state to store note data


    // to fetch note when component mounts or params.id change
    useEffect(() => {
        let getNote = async () => {
            // if id is 'new' then dont fetc data
            if (params.id === 'new') return
            try {
                // fetch notedata from api
                let response = await fetch(`/api/notes/${params.id}`);
                if (!response.ok) { // error handler
                    throw new Error('Failed to fetch note');
                }
                let data = await response.json(); //parse data muna
                setNotes(data); // then set note state with fetch data
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };
        getNote()
    }, [params.id]); // params.id ang dependecy or something like args


    let updateNote = async () => {
        fetch(`/api/notes/${params.id}/`,{
            method: 'PUT', //send PUT to update note data
            headers:{
                'Content-Type': 'application/json'
            },
            // convert note obj to json string in json format to update note data on server side
            body:JSON.stringify(note) 
        })
    };


    let deleteNote = async () => {
        fetch(`/api/notes/${params.id}/`, {
            method: 'DELETE', //send DELETE to dleete note
            headers:{
                'Content-Type': 'application/json'
            }
        })
        navigate('/'); // navigate to '/' or homepage after deleting
    }


    let createNote = async () => {
        fetch('/api/notes/',{
            method: 'POST', //send POST to create note
            headers:{
                'Content-Type': 'application/json'
            },
            // convert note obj to json string in json format to create note data on server side
            body:JSON.stringify(note)
        })
    };


    // function to handel form submission
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


    // function to handle textarea changes
    let handleChange = (value) => {
        setNotes(note => ({...note, 'body':value}))// Update the note body in the state
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
