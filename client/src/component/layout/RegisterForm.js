import React, { useState } from 'react'
import { Link, useLocation, useHistory, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import { FormContainer } from './FormContainer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


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

const RegisterForm = ({setAlert, register, isAuthenticated}) => {
    const location = useLocation();
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });
    const {name, email, password, cpassword} = data;
    
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const onChangeHandler = (e) => setData({...data, [e.target.name]: e.target.value}) 
            
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({name, email, password});
        }

    }

    if (isAuthenticated) {
        return <Redirect to='/posts' />
    }

    return (
        <Styles>
                <FormContainer>
                    <h1 className='text-center mt-5'>Register</h1>
                    <p className='lead'>
                        Create Your Account
                    </p>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                name='name'
                                onChange={(e) => onChangeHandler(e)}
                                required
                            >

                            </Form.Control>
                        </Form.Group>
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
                        
                        <Form.Group controlId='cpassword'>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={cpassword}
                                name='cpassword'
                                onChange={(e) => onChangeHandler(e)}
                                minLength='6'                               
                            >

                            </Form.Control>
                        </Form.Group>
                       
                        <Button type='submit' className='btn-block btn-light'>
                            Register
                        </Button>
                    </Form>
                    <Row className='py-3'>
                        <Col>
                        Have an account?    <Link className='link'  to={ redirect  ? `/login?redirect=${redirect}` : '/login'}>
                                                Sign In
                                            </Link>
                        </Col>
                    </Row>
                </FormContainer>
        </Styles>
    )
}

RegisterForm.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated 
});

export default connect(mapStateToProps, {setAlert, register})(RegisterForm);