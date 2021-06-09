import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment} from '../../actions/post';
import { Card, Container, Form } from 'react-bootstrap';

const DiscussionForm = ({ postId, addComment }) => {
    const [body, setBody] = useState('');
    return (
        <Container className="d-flex justify-content-center">
            <Card className='mt-5 p-5 w-75'>
                <Form onSubmit={e => {
                    e.preventDefault();
                    addComment(postId, { body });
                    setBody('');
                }}>
                            <Form.Group controlId='name'>
                                <Form.Label><p className="lead">Leave a comment</p></Form.Label>
                                <Form.Control
                                    as='textarea'
                                    placeholder='Enter Content'
                                    value={body}
                                    onChange={e => setBody(e.target.value)}
                                    required
                                >

                                </Form.Control>
                                <input value='Submit' type="submit" className="btn btn-info my-3" />
                            </Form.Group>
                </Form>
            </Card>
        </Container>
    )
}

DiscussionForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, {addComment})(DiscussionForm);
