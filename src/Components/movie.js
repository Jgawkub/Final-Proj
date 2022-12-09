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
 const filmEndpoint="https://6352caffd0bca53a8eb55114.mockapi.io/films"
 const [ntitle, setNTitle]=useState('')
 const [ndate, setNDate]=useState('')
 const [ndirector, setNDirector]=useState('')
 const [nimage, setNImage]=useState('')
 const [nplot, setNPlot]=useState('')
 const [nreview,setNReview]=useState('')


//What I'm trying to do here is to set the state already fropm the API so that when I edit boxes I can edit one value at a time and not have everything else be erased. 
 useEffect(()=>{
  axios.get(filmEndpoint).then((response)=>{
      setFilmData(response.data);
      console.log(response.data)
      setNTitle(response.data.title)
      setNDate(response.data.date)
      setNDirector(response.data.director)
      setNDate(response.data.date)
      setNImage(response.data.image)
      setNPlot(response.data.plot)
      setNReview(response.data.review)

  });
},[]);



//This update is if I would like to edit the details, lets say I got the name of the movie wrong but don't want to have to retype a bunch of stuff. Works except on re-render. I set the values to whatever the new information is. 
 const updateMovie1=(id,e)=>{
  
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{  
    title: ntitle,
    date: ndate,
    director: ndirector,
    image: nimage,
    plot: nplot,
    review: nreview
  }).then(()=>{getFilmData()})  
 }





  return(<div>
    
    <Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit your Movie Details Here.</Modal.Title>
    </Modal.Header>
        <Modal.Body> 
            <Form.Control type='text' id="title11" placeholder="Title" onChange={(e)=>{setNTitle(e.target.value)}}></Form.Control>
            <Form.Control type='number' id="date1" placeholder="Date" onChange={(e)=>{setNDate(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director1' placeholder="Director" onChange={(e)=>{setNDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url1'placeholder="Image URL" onChange={(e)=>{setNImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='plot1' rows={3} placeholder="Plot"onChange={(e)=>{setNPlot(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='review1' rows={3} placeholder="Review"onChange={(e)=>{setNReview(e.target.value)}}></Form.Control>
        </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant="danger" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick={()=>{updateMovie1(info.id); handleClose()}}>Submit</Button>
                </ButtonGroup>
                    
            </Modal.Footer>
    </Modal>
  

  <Card className="moviecard">
          <ButtonGroup>
            <Button variant='danger' className="w-50" onClick={()=>deleteMovie(info.id)}>Delete Movie</Button>
            <Button variant='primary' className="w-50" onClick={handleShow}>Edit </Button></ButtonGroup>
            <Card.Body className="moviecardbody">
            <Card.Img variant="top" src={info.image}/>
              
              <Link to={`/movies/${info.id}`}><Card.Title> Title: {info.title}</Card.Title></Link> 
                  <Card.Text>
                    Date: {info.date}
                    <br/>
                    Director: {info.director}
                    <br/>
                  </Card.Text>
                  Stars: <ReactStars count={5} value={info.rating} edit={false}/>
                    {/* <Comment1 updateMovie={updateMovie} 
                              info={info} /> */}
                  </Card.Body>
  </Card>
  
  </div>)
}