import React from "react";
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container'

export default function Navigation(){
    return(   <Navbar id='nav' className='nav'>
        <Container>
        <Navbar.Brand id="navtitle">Jakub's Final Project </Navbar.Brand>
        <Nav className=" n1 justify-content-end flex-grow-1 pe-3">
            <li><Link className="li" to='/'>Home</Link></li>
            <li ><Link className="li" to='/movieform'>Movie Reviewer</Link></li>
            <li><Link className="li" to='/feedback'>Feedback </Link></li>
        </Nav>
        </Container>
            </Navbar>
)
}