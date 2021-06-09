import axios from 'axios';
import { setAlert } from './alert';


export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/posts');

        dispatch({
            type: 'GET_POSTS',
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: 'POSTS_ERROR',
            payload: {msg: error.response}
        });
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/posts/${id}`);
        console.log(res.data)
        dispatch({
            type: 'GET_POST',
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: 'GET_POST_ERROR',
            payload: {msg: error.response}
        });
    }
}


export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`posts/like/${id}`);

        dispatch({
            type: 'UPDATE_LIKES',
            payload: {id, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: 'POSTS_ERROR',
            payload: {msg: error.response}
        });
    }
}

export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`posts/unlike/${id}`);

        dispatch({
            type: 'UPDATE_LIKES',
            payload: {id, likes: res.data}
        });
    } catch (error) {
        dispatch({
            type: 'POSTS_ERROR',
            payload: {msg: error.response}
        });
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`posts/${id}`);

        dispatch({
            type: 'DELETE_POST',
            payload: id
        });

        dispatch(setAlert('Post deleted', 'success'));
    } catch (error) {
        dispatch({
            type: 'DELETE_POST_ERROR',
            payload: {msg: error.response}
        });
    }
}


export const addPost = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/posts`, data, config);

        dispatch({
            type: 'ADD_POST',
            payload: res.data
        });

        dispatch(setAlert('Post added', 'success'));
    } catch (error) {
        dispatch({
            type: 'ADD_POST_ERROR',
            payload: {msg: error.response}
        });
    }
}

export const addComment = (id, data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/posts/comment/${id}`, data, config);

        dispatch({
            type: 'ADD_COMMENT',
            payload: res.data
        });

        dispatch(setAlert('Comment added', 'success'));
    } catch (error) {
        dispatch({
            type: 'ADD_COMMENT_ERROR',
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}


export const deleteComment = (postId, commentId) => async dispatch => {
 
    try {
        const res = await axios.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: 'DELETE_COMMENT',
            payload: res.data
        });

        dispatch(setAlert('Comment deleted', 'success'));
    } catch (error) {
        dispatch({
            type: 'DELETE_COMMENT_ERROR',
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}