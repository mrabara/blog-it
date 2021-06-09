import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import { addLike, removeLike, deletePost } from '../../actions/post';

const Post = ({
    deletePost,
    addLike,
    removeLike,
    auth,
    post: { _id, body, name, avatar, user, likes, comments, date },
    showActions
}) => {
    return (
        <div className="d-flex justify-content-center">
            <Card className='bg-white p-3 my-1 d-flex justify-content-evenly w-75'>
                <Row>    
                    <Col className='col-lg-4'>
                        <div className='text-center' >
                            <img src={avatar} alt="" className="rounded-circle img-thumbnail" />
                            <h4>{ name}</h4>
                        </div>  
                    </Col>
                    <Col className='col-lg-8'>
                        <div className='d-flex flex-column align-items-start'>
                            <Row>
                                <p className="my-1">
                                    {body}
                                </p>
                            </Row>
                            <Row>
                                <p>Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></p>
                            </Row>
                            <Row>
                                {showActions &&
                                    <Fragment>
                                        <div className='d-flex justify-content-evenly flex-row'>
                                            <button onClick={e => addLike(_id)} type='button' className='btn btn-light bg-transparent'>
                                            <i className="fas fa-thumbs-up "/>{' '}
                                            <span>
                                                {
                                                    likes.length > 0 && (
                                                        <span>{ likes.length }</span>
                                                        )
                                                }
                                            </span>
                                            </button>
                                            <button onClick={e => removeLike(_id)} type='button' className='btn btn-light'>
                                            <i className="fas fa-thumbs-down" />
                                            </button>
                                            <Link to={`/post/${_id}`} className='btn btn-primary'>
                                                Discussion{' '}
                                                {
                                                    comments.length > 0 && (
                                                        <span>{ comments.length }</span>
                                                        )
                                                }
                                            </Link>
                                                {
                                                    !auth.loading && user === auth.user._id && (
                                                        <button onClick={e => deletePost(_id)} className="btn btn-danger ml-2">
                                                        <i className="fas fa-times" />
                                                        </button>
                                                        )
                                                }
                                        </div>
                                    </Fragment>
                                }
                                
                            </Row>
                        </div>
                    </Col>
                </Row>    
            </Card>
        </div>
       
    )
}

Post.defaultProps = {
    showActions: true
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}



const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(Post);
