import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Card from"react-bootstrap/Card"
import Comment1 from "./comment1";
import axios from "axios";

// To Do:
// Be able to delete a review? How could I accomplish this. 


export default function Movie({info, getFilmData, filmData, setFilmData, deleteMovie}){
 const[review, setReview]=useState([])
 //I place the review state down here because I don't want people to initially leave a review on the first for, 


const addReview=(e)=>{//I pass this function down to my comment component and set the state to whatever the value is within the text area Stored locally.  Can I use an API here. 
    // e.preventDefault()
   let reviewText=document.getElementById('review')
   setReview(review=>[...review,reviewText.value])
   updateMovie(info.id)
   console.log(review)
}

const reviewRender=review.map((review,index)=>{
return(<div key={review+index}>{review}</div>)

}
    
)
//A little messy to get the value of the text area by using the id, would ideally want it to take the target.value problem I am having is that it is updating it in real time, and I only want to do it after im done with a comment. 
const updateMovie=(id,e)=>{
  const reviewText=document.getElementById(`review + ${id}`)
  setReview(review=>[...review,reviewText.value])
  console.log('updating'+id);
  axios.put(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`,{
      review,
  }).then(()=>{getFilmData()})
}

console.log(review)

const action=()=>{
  console.log("Butts")
}


  //I take the props from the movie form component and using React bootstrap make it into a card. 
  return(<div>
        <Card onClick={action} style={{width:'18rem'}}>
          <Button variant='danger' onClick={()=>deleteMovie(info.id)}>Delete Movie</Button>
            <Card.Img  variant="top" src={info.image}/>
        <Card.Body>
        <Card.Title>Title:{info.title}</Card.Title> 
        <Card.Text>
        Date:{info.date}
        <br/>
        Director:{info.director}
        <br/>
        Summary:{info.plot}
        </Card.Text>
        <Comment1 updateMovie={updateMovie} 
        info={info} 
        addReview={addReview} 
        review={review} 
        setReview={setReview}/>
      {reviewRender}
        </Card.Body>
        </Card>
    </div>)
}