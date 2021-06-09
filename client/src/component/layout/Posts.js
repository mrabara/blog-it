import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { Container } from 'react-bootstrap';
import Post from './Post';
import PostForm from './PostForm';


const Posts = ({ post: { posts, loading }, getPosts }) => {
    
    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <Container>
            <PostForm />
            <Container>
                <p className="lead text-danger">
                    <h1>Latest Posts</h1>
                </p>
                {
                    posts === null ? ' ' : (
                        posts.map(post => (
                            <Post key={post._id} post={post} />
                        ))
                   )
                }
            </Container>
        </Container>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts);
