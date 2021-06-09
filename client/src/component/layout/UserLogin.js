import React, { useState } from 'react'
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { FormContainer } from './FormContainer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

const Styles = styled.div`
    .btn{
        background-color: #468fea;
        color: #fff;
        border-radius: 5px;   

        &:hover{
                color: #bbb
            }
    }

    .card{
       box-shadow: 0px 7px 5px -2px #333;
    }

    .link{
        color: #03506f;
        font-weight: bold;
    }
`

const UserLogin = ({loginUser, isAuthenticated}) => {
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = data;

    const onChangeHandler = (e) => setData({...data, [e.target.name]: e.target.value}) 

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password);
        
        
        // history.push('/posts');
    }

    if (isAuthenticated) {
        return <Redirect to='/allposts' />
    }

    return (
        <Styles>
                <FormContainer>
                    <h1 className='text-center mt-5'>Sign In</h1>
                 
                    <Form onSubmit={e => submitHandler(e)}>
                    <Form.Group controlId='email'>
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                name='email'
                                onChange={(e) => onChangeHandler(e)}
                                required
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                name='password'
                                onChange={(e) => onChangeHandler(e)}
                                minLength='6'
                            >

                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' className='btn-block btn-light'>
                            Sign In
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                        New User?   <Link className='link'  to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                            Register
                                        </Link>
                        </Col>
                    </Row>
                </FormContainer>
        </Styles>
    )
}


UserLogin.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser})(UserLogin);