import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Post from '../layout/Post';
import { Link } from 'react-router-dom';
import DiscussionForm from './DiscussionForm';
import { Container } from 'react-bootstrap';
import Comment from './Comment';

const Discussion = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match])
    return loading || post === null ? ' ' :(
        <Container>
            <div className="m-5">
                <Link to='/allposts' className='m-5 text-primary text-decoration-none'>
                    Back to Posts
                </Link>
            </div>
            <Post post={post} showActions={false} />
            <DiscussionForm postId={post._id} />
            <div className="mt-5">
                {
                    post.comments.map(comment => (
                        <Comment key={comment._id} comment={comment} postId={post._id} />
                    ))
                }
            </div>
        </Container>
    )
}

Discussion.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPost})(Discussion)
