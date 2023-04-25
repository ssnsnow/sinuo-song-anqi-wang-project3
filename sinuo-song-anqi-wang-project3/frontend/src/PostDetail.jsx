import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function PostDetail() {

    const [postDetails, setPostDetails] = useState({});
    const navigate = useNavigate();
    const params = useParams()

    async function fetchAndSetPost() {
        const postResponse = await axios.get('/api/post/' + params.username)
        setPostDetails(postResponse.data)
    }

    useEffect(function() {
        fetchAndSetPost()
    }, []);

    async function deletePost() {
        const response = await axios.delete('/api/post/' + params.username)
        navigate('/');
    }

    return (
        <div>
            <div>
                <div class="fw-bold">John Doe</div>
                <div class="text-muted">john.doe@gmail.com</div>
            </div>
            <span class="badge rounded-pill badge-success">Active</span>
        </div>
    )


}