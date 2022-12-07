import React from "react";
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import {Link} from "react-router-dom";

export default function Navigation(){
    return(   <Navbar ariant="dark">
        <Nav className="me-auto">
    <Link to='/'> Home </Link>
    <Link to='/movieform'> Movie Reviewer </Link>
    <Link to='/feedback'> Feedback </Link>
        </Nav>
            </Navbar>
)
}