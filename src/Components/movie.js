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


//Old use Effect of trying to edit just pieces of information. 
//  useEffect(()=>{
//   axios.get(filmEndpoint).then((response)=>{
//       setFilmData(response.data);
//       console.log(response.data)
//       setNTitle(response.data.title)
//       setNDate(response.data.date)
//       setNDirector(response.data.director)
//       setNDate(response.data.date)
//       setNImage(response.data.image)
//       setNPlot(response.data.plot)
//       setNReview(response.data.review)

//   });
// },[]);


//With this useEffect I filter and then set the states for all the various pieces of data so that when I go into a form to edit just one piece of information the others don't go blank. 
useEffect(()=>{
  axios.get(filmEndpoint).then((response)=>{
      setFilmData(response.data);
      filmData.filter(movie=>movie.id===info.id).map((film,index)=>{
          setNTitle(film.title)
          console.log(film.title)
          setNDate(film.date)
          setNDirector(film.director)
          setNImage(film.image)
          setNPlot(film.plot)
          setNReview(film.review)
      })
         
   });
},[]);


//This update is if I would like to edit the details, I set the state up in the movie list to whatever the state is in each individual movie is. 
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
                    <Button id="close" variant="custom" className="close" onClick={handleClose}><i className="bi bi-x-square"></i></Button>
                    <Button id="submit" variant="custom" className="submit" onClick={()=>{updateMovie1(info.id); handleClose()}}><i className="bi bi-send"></i></Button>
                </ButtonGroup>
                    
            </Modal.Footer>
    </Modal>
  

  <Card className="card">
          <ButtonGroup >
            <Button  id="delete" variant="custom"  onClick={()=>deleteMovie(info.id)}><i className="bi bi-trash3"></i></Button>
            <Button  id="edit" variant="custom" onClick={handleShow}><i className="bi bi-pencil"></i></Button></ButtonGroup>
            <Card.Body className="cardbody">
              <Card.Img variant="top"src={info.image}/>
                <Link className="title" to={`/movies/${info.id}`}><Card.Title > Title: {info.title}</Card.Title></Link> 
                <Card.Text>
                      {info.date}
                      <br/>
                      {info.director}
                </Card.Text>
                <ReactStars count={5} value={info.rating} edit={false}/>   
            </Card.Body>
  </Card>
  
  </div>)
}