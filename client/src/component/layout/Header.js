import React, { Fragment} from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logOut } from '../../actions/auth';

const Styles = styled.div` 
   .navbar{
       background-color: #367588;
   }
   

   .navbar-brand, .navbar-nav .nav-link{
       color: #ddd;

        &:hover{
            color: #fff;
        }

   }


`

const Header = ({ auth: isAuthenticated, loading }, logOut) => {

    const authLinks = (
        <Fragment> 
            <Nav.Link onClick={logOut} href='/login'>                        
                <i className='fas fa-sign-out-alt' />{' '}
                Log Out                    
            </Nav.Link>
        </Fragment>
    );

    const guestLink = (
        <Fragment>
            <Nav.Link href='/login'>Sign In</Nav.Link>
            <Nav.Link href='/register'>Register</Nav.Link>
        </Fragment>
    );

    return (
        <Styles>
            <header>
                <Navbar  variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand><h3><a href='/' className='text-decoration-none text-light'>Blog It!</a> </h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            {
                                    !loading && <Fragment> {isAuthenticated.isAuthenticated ? authLinks : guestLink}</Fragment>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </header>
        </Styles>
    )
}


Header.propTypes = {
    logOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, {logOut})(Header);