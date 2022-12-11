import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios"
import ReactStars from "react-rating-stars-component"





//This component just renders an individual view of the film. 
export default function IndividualMovie({ info, getFilmData, filmData, setFilmData, }){
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"
    
    
    useEffect(()=>{
        axios.get(filmEndpoint).then((response)=>{
            setFilmData(response.data);
            console.log(response.data)
        });
    },[]);

    const {id}=useParams()
console.log(filmData)
    return(<Container className=" box d-flex align-items-center justify-content-center " >
        
    {/* Here I am just rendering the individual movie */}
        
        {filmData.filter(movie=>movie.id===id).map((movie,index)=>{
            return(<div key={index}>
            <Card className="fcard"  >
               
            <Card.Body className="cardbody">
                <Row>
                    <Col>
                        <Card.Img src={movie.image}/>
                    </Col>
                    <Col>
                    <h2>{movie.title}</h2>
                    <b>{movie.date}</b>
                        <br/>
                    <b>{movie.director}</b>
                    
                        <div className="border-bottom border-dark"></div>
                    <b>Plot: </b>{movie.plot}
                        <br/>
                        <div className="border-bottom border-dark"></div>
                        <ReactStars count={5} size={20} value={movie.star} edit={false}/>  
                    <b>My thoughts:</b> {movie.review}
                   
                    </Col>
                </Row>
            </Card.Body>
        </Card>             
              </div>)})}
     </Container>)
}