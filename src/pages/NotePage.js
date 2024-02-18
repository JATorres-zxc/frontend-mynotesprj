import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const NotePage = () => {
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

    return (
        <div>
            <p>{note?.body}</p>
        </div>
    );
};

export default NotePage;
