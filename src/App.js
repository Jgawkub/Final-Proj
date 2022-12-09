
import React, {useState} from 'react'
import styles from './App.css';
import MovieForm from './Components/movieform';
import FeedbackForm from './Components/feedbackform';
import Home from './Components/home';
import IndividualMovie from './Components/inidividualmovie'; //delete this after test. 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Routes, Link, Route } from "react-router-dom";
import Navigation from './Components/navbar';
import Footer from './Components/footer';

function App() {
    const[filmData,setFilmData]=useState([])
 
    return ( 
    <Container className={styles} id="page">
      <Navigation/>

    <Routes> 
        <Route path='/' element={<Home />}/>
        <Route path='/feedback' element={<FeedbackForm/>}/>
        <Route path='/movieform/' element={<MovieForm filmData={filmData} setFilmData={setFilmData}/>}/>
        <Route path='/movies/:id' element={<IndividualMovie filmData={filmData} setFilmData={setFilmData}/>}/>
    </Routes>
<br/>
    <Footer/>
</Container>
   )
}

export default App;
