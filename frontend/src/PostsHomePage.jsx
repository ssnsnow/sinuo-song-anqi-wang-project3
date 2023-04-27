import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './App';
import Navbar from './Navbar';
import './style/page.css';
import { Link } from "react-router-dom";

export default function PostsHomePage() {

    const [posts, setPosts] = useState([])
    const { activeUsername, setActiveUsername } = useContext(UserContext);
    const [editingPostId, setEditingPostId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent]= useState('');
    const [post, setPost] = useState('')

    const handleEditClick = (postId, currentContent) => {
        setEditingPostId(postId);
        setIsEditing(true);
        setUpdatedContent(currentContent)
    }

    async function handleSaveClick(postId, updatedContent){
        const response = await axios.put(`/api/posts/${postId}`, {content:updatedContent})
        const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
              return { ...post, content: updatedContent, datePosted: response.data.datePosted};
            } else {
              return post;
            }
          });
        setPosts(updatedPosts);
        setEditingPostId(null);
        setIsEditing(false);
    }

    async function handleContentChange(event) {
        setUpdatedContent(event.target.value);
    }
    
    async function getAllPosts() {
        const response = await axios.get('/api/posts/allPosts')
        setPosts(response.data);
    }

    async function handleDelete(postId) {
        const response = await axios.delete(`/api/posts/${postId}`);
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
    }

    useEffect(() => {
        getAllPosts()
    }, []);

    function setNewPost(event) {
      const post = event.target.value;
      setPost(post);
    }

    async function submitPost() {
        try {
            const response = await axios.post('/api/posts/create', {content: post})
            setPost('');
            window.location.reload(false);
        } catch (e) {
            console.log(e)
            setPostError(e.response)
        }
        console.log(post);
    }

    const newPostCompoment = activeUsername ?
        <div className="col-md-10 mb-3">
            <div className="card border border-primary shadow-0 mb-3">
              <div className="card-body">
                <h5 className="card-title">Create new post</h5>
                <form className="d-flex input-group w-100">
                  <input placeholder="New post" className="card-text form-control" value = {post} onInput = {setNewPost}/>
                  <a className="btn btn-outline-primary" onClick={submitPost}>Post</a>
                </form>
                
              </div>
          </div>
        </div>:null
    
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
                onClick={() => handleEditClick(post._id, post.content)}
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

        const saveComponent =
        <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
            <a
                className="btn btn-link m-0 text-reset"
                role="button"
                data-ripple-color="primary"
                onClick={() => handleSaveClick(post._id, updatedContent)}
                >
                Save
                <i className="far fa-pen-to-square"></i>
            </a>
        </div>;

        const postComponent = editingPostId === post._id && isEditing ?
        <div className="col-md-10 mb-3 align-items-center">
            <div className="card">
                <div className="card-body">
                    <div className="flex-column">
                        <div className="align-items-center mb-3">
                            <div className="ms-0">
                              <Link to={"/profile/" + post.user.username}>
                                <p className="fw-bold mb-1">{post.user.username}</p>
                              </Link>
                                <div className="form-outline">
                                    <textarea
                                        className="form-control w-100 border border-success shadow-0 mb-3" 
                                        id="textAreaExample6"
                                        rows="3"
                                        value={updatedContent}
                                        onChange={handleContentChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="badge rounded-pill badge-success">{formattedDate}</div>
                    </div>
                </div>
                {saveComponent}
            </div>
        </div> :
        <div className="col-md-10 mb-3 align-items-center">
            <div className="card">
                <div className="card-body">
                    <div className="flex-column">
                        <div className="align-items-center mb-3">
                            <div className="ms-3">
                              <Link to={"/profile/" + post.user.username}>
                                <p className="fw-bold mb-1">{post.user.username}</p>
                              </Link>
                            <Link to={"/profile/" + post.user.username}>
                              <div className="text-muted text-break mb-0">{post.content}</div>
                            </Link>
                            </div>
                        </div>
                        <div className="badge rounded-pill badge-success">{formattedDate}</div>
                    </div>
                </div>
                {editComponent}
            </div>
        </div>

        postList.push(postComponent);
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
              <div className="square square-lg bg-white text-white">
                  <small>Square</small>
              </div>
              <div className="square square-lg bg-white text-white">
                  <small>Square</small>
              </div>
              <div className="square square-lg bg-white text-white">
                  <small>Square</small>
              </div>
            </div>
              <div className="d-flex flex-column align-items">
                {newPostCompoment}
                {postList} 
              </div>
        </div>
    )
}