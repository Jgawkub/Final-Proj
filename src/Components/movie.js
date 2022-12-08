import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import React, {useState, useEffect} from "react";
import Card from"react-bootstrap/Card"
import Comment1 from "./comment1";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";




// To Do:
// Allow people to edit Movie details, Do one of those modals again 


export default function Movie({info, getFilmData, displayOne, filmData, setFilmData, deleteMovie, setToggle, toggle, star, newRating, setTitle, setDate, setDirector, setPlot, setImage, title, date, director, image, plot }){
 const[review, setReview]=useState([])
 //I place the review state down here because I don't want people to initially leave a review on the first for, 
 const Navigate=useNavigate()
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);


//Figure out how to preload the state of each movie. 




//A little messy to get the value of the text area by using the id, would ideally want it to take the target.value problem I am having is that it is updating the state render in real time, and I only want to do it after im done with a comment. 
const updateMovie=(id,e)=>{
  const reviewText=document.getElementById(`review + ${id}`)
  setReview(review=>[...review,reviewText.value])
  console.log('updating'+id);
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{
    review,
  }).then(()=>{getFilmData()})
}

//This update is if I would like to edit the details, lets say I got the name of the movie wrong but don't want to have to retype a bunch of stuff. 
 const updateMovie1=(id,e)=>{
  
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{  
    title: title,
    date: date,
    director: director,
    image: image,
    plot: plot,
    review: review
  
  }).then(()=>{getFilmData()})  
 }





  return(<div>
    
    <Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit your Movie Details Here.</Modal.Title>
    </Modal.Header>
        <Modal.Body> 
            <Form.Control type='text' id="title11" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
            <Form.Control type='text' id="date1" placeholder="Date" onChange={(e)=>{setDate(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director1' placeholder="Director" onChange={(e)=>{setDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url1'placeholder="Image URL" onChange={(e)=>{setImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='plot1' rows={3} placeholder="Plot"onChange={(e)=>{setPlot(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='review1' rows={3} placeholder="Review"onChange={(e)=>{setReview(e.target.value)}}></Form.Control>
        </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="danger" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick={()=>{updateMovie1(info.id); handleClose()}}>Submit</Button>
                </ButtonGroup>
                    
            </Modal.Footer>
    </Modal>
  

  <Card style={{width:'18rem', padding:'5px'}}>
          <ButtonGroup>
            <Button variant='danger' className="w-50" onClick={()=>deleteMovie(info.id)}>Delete Movie</Button>
            <Button variant='primary' className="w-50" onClick={handleShow}>Edit </Button></ButtonGroup>
            <Card.Img  onClick={()=>displayOne(info, info.id)} variant="top" src={info.image}/>
              <Card.Body>
              <Link to={`/movies/${info.id}`}><Card.Title> Title: {info.title}</Card.Title></Link> 
                  <Card.Text>
                    Date: {info.date}
                    <br/>
                    Director: {info.director}
                    <br/>
                    Summary:{info.plot}
                  </Card.Text>
                  Stars: <ReactStars count={5} value={info.rating} edit={false}/>
                    <Comment1 updateMovie={updateMovie} 
                              info={info} 
                              review={review} 
                              setReview={setReview}/>
                  <br></br>
                 
      
                  </Card.Body>
          </Card></div>)
}