import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'







export default function IndividualMovie({ info, getFilmData, filmData, setFilmData, deleteMovie, setToggle, toggle, star, newRating}){
   


    const {id}=useParams()
console.log(filmData)
    return(<Container className="d-flex justify-content-center" >
        
    
        
        {filmData.filter(movie=>movie.id===id).map((movie,index)=>{
            return(<div key={index}>
            <Card style={{width:'50rem', padding:'5px'}}>
               
            <Card.Body>
                <Row>
                <Col>
                <Card.Img src={movie.image}/>
              
                </Col>
                <Col>
                {movie.title}
                <br/>
                {movie.date}
                <br/>
                {movie.director}
                <div className="border-bottom border-dark"></div>
                <br/>
                {movie.plot}
                </Col>

                
             

                </Row>
                </Card.Body>
           </Card>        
                    
              </div>)
        }
            
        )
        }
    

        
     </Container>)
}