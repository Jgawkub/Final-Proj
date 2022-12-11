import React from "react";
import {Link} from 'react-router-dom';
import nopage from '../Images/nopage.gif'

export default function Error(){
    return(<div className="error"><h3>Sorry this page doesn't exist!</h3><img src={nopage} alt="gif of Gandalf saying he has no memory of this place"/>
    <br></br></div>)
}