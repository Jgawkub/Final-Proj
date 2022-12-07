import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React, {useState} from 'react'
import './App.css';
import MovieForm from './Components/movieform';
import Feedback from './Components/feedback';
import Home from './Components/home';
import IndividualMovie from './Components/inidividualmovie'; //delete this after test. 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Link, Route } from "react-router-dom";
import Navigation from './Components/navbar';

function App() {
    const[filmData,setFilmData]=useState([])
 
    return ( 
    <Container>
      <Navigation/>

    <Routes> 
        <Route path='/' element={<Home />}/>
        <Route path='/feedback' element={<Feedback   />}/>
        <Route path='/movieform/' element={<MovieForm filmData={filmData} setFilmData={setFilmData}/>}/>
        <Route path='/movies/:id' element={<IndividualMovie filmData={filmData} setFilmData={setFilmData}/>}/>
    </Routes>
</Container>
   )
}

export default App;
