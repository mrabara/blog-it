import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const Comment = ({
    postId,
    comment: { _id, body, name, avatar, user, date },
    deleteComment,
    auth
}) => {
    return (
        <Container className='d-flex justify-content-center'>
            <Card className='w-75 p-5'>
                <Row>
                    <Col>
                        <div className='text-center' >
                            <img src={avatar} alt="" className="rounded-circle img-thumbnail" />
                            <h4>{name}</h4>
                        </div>  
                    </Col>
                    <Col>
                        <p>
                            {body}
                        </p>
                        <p>
                            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                        </p>
                    </Col>
                    <div className='mt-5'>
                    {
                        !auth.loading && user === auth.user._id && (
                            <button
                                onClick={e =>
                                    deleteComment(postId, _id)}
                                type='button'
                                className='btn btn-danger'
                            >
                                Delete Comment
                            </button>
                        )
                    }
                    </div>
                </Row>
            </Card>
        </Container>
    )
}

Comment.propTypes = {
    postId: PropTypes.func.isRequired,
    comment: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(Comment)
