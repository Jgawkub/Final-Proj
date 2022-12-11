import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import React, {useState, useEffect} from "react";
import Card from"react-bootstrap/Card"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";







export default function Movie({info, getFilmData,filmData, setFilmData, deleteMovie, star, setStar, ratingChanged }){
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
 const [nstar,setNStar]=useState(null)


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
          setNStar(film.star)
      })
         
   });
},[]);


const ratingNChanged = (newRating) => {
  console.log(newRating)
  setNStar(newRating);
};

//This update is if I would like to edit the details, I set the state up in the movie list to whatever the state is in each individual movie is an to avoid having one field change all the other.s 
 const updateMovie=(id,e)=>{
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{  
    title: ntitle,
    date: ndate,
    director: ndirector,
    image: nimage,
    plot: nplot,
    review: nreview,
    star: nstar
  }).then(()=>{getFilmData()})  
 }

  return(<div>
    
    <Modal centered show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit your Movie Details Here.</Modal.Title>
    </Modal.Header>
        <Modal.Body> 
            <Form.Control type='text' id="title11" placeholder="Title" onChange={(e)=>{setNTitle(e.target.value)}}></Form.Control>
            <Form.Control type='number' id="date1" placeholder="Year" onChange={(e)=>{setNDate(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director1' placeholder="Director" onChange={(e)=>{setNDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url1'placeholder="Image URL" onChange={(e)=>{setNImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='plot1' rows={3} placeholder="Plot"onChange={(e)=>{setNPlot(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='review1' rows={3} placeholder="Review"onChange={(e)=>{setNReview(e.target.value)}}></Form.Control>
            <ReactStars count={5} size={24} onChange={ratingNChanged}/>
        </Modal.Body>
            <Modal.Footer>
                <ButtonGroup>
                    <Button id="close" variant="custom" className="close" onClick={handleClose}><i className="bi bi-x-square"></i></Button>
                    <Button id="submit" variant="custom" className="submit" onClick={()=>{updateMovie(info.id); handleClose()}}><i className="bi bi-send"></i></Button>
                </ButtonGroup>
                    
            </Modal.Footer>
    </Modal>
  

  <Card className="card">
          <ButtonGroup >
            <Button  id="delete" variant="custom"  onClick={()=>deleteMovie(info.id)}><i className="bi bi-trash3"></i></Button>
            <Button  id="edit" variant="custom" onClick={handleShow}><i className="bi bi-pencil"></i></Button></ButtonGroup>
            <Card.Body className="cardbody">
              <Card.Img variant="top"  src={info.image}/>
                <Link className="title" to={`/movies/${info.id}`}><Card.Title >{info.title}</Card.Title></Link> 
                <Card.Text>
                      <b>{info.date}</b>
                      <br/>
                      <b>{info.director}</b>
                </Card.Text>
                <ReactStars count={5} size={20} value={info.star} edit={false}/>   
            </Card.Body>
  </Card>
  
  </div>)
}