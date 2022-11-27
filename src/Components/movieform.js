import React,{useState,useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Movie from "./movie";

//In this component I handle my posting and getting data. I load all my movie info to an API. 
export default function MovieForm({test}){
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"
    const[filmData,setFilmData]=useState([])
    const[title,setTitle]=useState('')
    const[date,setDate]=useState('')
    const[director,setDirector]=useState('')
    const[image,setImage]=useState('')
    const[plot,setPlot]=useState('')
    
  
    useEffect(()=>{
        axios.get(filmEndpoint).then((response)=>{
            setFilmData(response.data);
            console.log(response.data)
        });
    },[]);


    const getFilmData=()=>{
        axios.get(filmEndpoint).then((getFilmData)=>{
            setFilmData(getFilmData.data)
        })
    }
    const postMovie=(e)=>{
        e.preventDefault()
        axios.post(filmEndpoint,{
            title,
            date, 
            director,
            image, 
            plot,
        }).then(()=>{getFilmData()});
        console.log(title+director)
    }
//I map over my movie API and then pass the information down to my movie component.
    const renderMovie=filmData.map((movie,index)=>{
        console.log({index})
        // return(<div key={index}><div>{movie.title}</div></div>)
        return(<div key={movie+index}><Movie info={movie}/></div>)
    })

    return(<div>
        <Form onSubmit={postMovie}>
            <Form.Control type='text' id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
            <Form.Control type='text' id="date" placeholder="Date" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director' placeholder="Director" onChange={(e)=>{setDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url'placeholder="Image URL" onChange={(e)=>{setImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' rows={3} placeholder="Plot"onChange={(e)=>{setPlot(e.target.value)}}></Form.Control>
            <Button variant="primary" onClick={test} type="submit">
        Submit
      </Button>
        </Form>

        {renderMovie}
</div>

        
    )
}