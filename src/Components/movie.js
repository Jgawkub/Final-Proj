import { Button } from "bootstrap";
import React, {useState} from "react";
import Card from"react-bootstrap/Card"




export default function Movie({info}){
//  const[review,SetReview]=useState['']
  
  //I take the props from the movie form component and using React bootstrap make it into a card. 
  return(<div>
        <Card style={{width:'18rem'}}>
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
        </Card.Body>

        </Card>
    </div>)
}