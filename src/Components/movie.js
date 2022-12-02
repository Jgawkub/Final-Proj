import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Card from"react-bootstrap/Card"
import Comment1 from "./comment1";
import axios from "axios";
import { Link, Route, Routes, useNavigate, useParams  } from 'react-router-dom'
import Test from "./test";
import TestMovie from "./testmovie";
import ReactStars from "react-rating-stars-component";



// To Do:
// Be able to delete a review? How could I accomplish this. 


export default function Movie({info, getFilmData, filmData, setFilmData, deleteMovie, setToggle, toggle, star, newRating }){
 const[review, setReview]=useState([])
 //I place the review state down here because I don't want people to initially leave a review on the first for, 
 const Navigate=useNavigate()

 const{id} = useParams()



const reviewRender=review.map((review,index)=>{
return(<div key={review+index}><br/>{review}<br/></div>)

}
    
)
//A little messy to get the value of the text area by using the id, would ideally want it to take the target.value problem I am having is that it is updating the state render in real time, and I only want to do it after im done with a comment. 
const updateMovie=(id,e)=>{
  const reviewText=document.getElementById(`review + ${id}`)
  setReview(review=>[...review,reviewText.value])
  console.log('updating'+id);
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{
      review,
  }).then(()=>{getFilmData()})
}



const action=()=>{

 setToggle(true)
  
}


  //I take the props from the movie form component and using React bootstrap make it into a card. 
  return(<Card style={{width:'18rem', padding:'5px'}}>
          <Button variant='danger' onClick={()=>deleteMovie(info.id)}>Delete Movie</Button>
            <Card.Img  onClick={action} variant="top" src={info.image}/>
              <Card.Body>
                <Card.Title> Title: {info.title}</Card.Title> 
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
                  {reviewRender}
      
                  </Card.Body>
          </Card>)
}