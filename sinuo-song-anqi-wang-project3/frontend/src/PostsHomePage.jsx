import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './App';

export default function PostsHomePage() {

    const [posts, setPosts] = useState([])
    // const [activeUsername, setActiveUsername] = useState(null)
    const { activeUsername, setActiveUsername } = useContext(UserContext);
    

    async function getAllPosts() {
        const response = await axios.get('/api/posts/allPosts')
        setPosts(response.data);
    }

    async function handleDelete(postId) {
        const response = await axios.delete(`/api/posts/${postId}`);
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
    }

    // async function checkIfUserIsLoggedIn() {
    //     const response = await axios.get('/api/users/isLoggedIn')
    //     setActiveUsername(response.data.username)
    // }

    useEffect(() => {
        getAllPosts()
    }, []);

    // useEffect(() => {
    //     checkIfUserIsLoggedIn()
    // }, []);

    const postList = [];
    for(let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const dateType = new Date(post.datePosted);
        const formattedDate = dateType.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
          });
        const editComponent = activeUsername && activeUsername === post.user.username ? 
        <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
            <a
                className="btn btn-link m-0 text-reset"
                role="button"
                data-ripple-color="primary"
                >
                Edit
                <i className="far fa-pen-to-square"></i>
            </a>
            <a
                className="btn btn-link m-0 text-reset"
                role="button"
                data-ripple-color="primary"
                onClick={() => handleDelete(post._id)}
                >
                Delete
                <i className="far fa-trash-can"></i>
            </a>
        </div> : null;
        const postComponent =
                <div className="col-md-10 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                        <a href="#"><p className="fw-bold mb-1">{post.user.username}</p></a>
                                    <p className="text-muted mb-0">{post.content}</p>
                                    </div>
                                </div>
                                <span className="badge rounded-pill badge-success">{formattedDate}</span>
                            </div>
                        </div>
                        {editComponent}
                    </div>
                </div>;
        postList.push(postComponent);
    }

    return (
        <div>
            <div className="container flex-column d-flex align-items-center">
                {postList}
            </div>
        </div>
    )
}