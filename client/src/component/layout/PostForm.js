import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addPost } from '../../actions/post';
import { Card, Form } from 'react-bootstrap';

const PostForm = ({ addPost }) => {
    const [body, setBody] = useState('');

    return (
        <Card className='mt-5 p-5'>
            <Form onSubmit={e => {
                e.preventDefault();
                addPost({ body });
                setBody('');
            }}>
                        <Form.Group controlId='name'>
                            <Form.Label><p className="lead">Add some post</p></Form.Label>
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
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
}



export default connect(null, {addPost})(PostForm);
