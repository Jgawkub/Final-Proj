import React,{useState,useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import axios from "axios";
import Movie from "./movie";
import Stack from 'react-bootstrap/Stack';
import ReactStars from "react-rating-stars-component";

import Test from "./test";
//To Do still:
//1. Do a filter method that would allow people to select movies based on a particular criteria. Separate component? Did this. How to make this into something that I can do on click.
//2.  If time, create a way to push films to add selected films to like a to a too watch list. 
//3. When somone clicks on a movie card, it takes them to just a singular vision. 
//4. Let people edit the movie details?

//In this component I handle my posting and getting data. I load all my movie info to an API. All these states are a little verbose, could I put these in the API itself? 
export default function MovieForm({test,}){
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"
    const[filmData,setFilmData]=useState([])
    const[title,setTitle]=useState('')
    const[date,setDate]=useState('')
    const[director,setDirector]=useState('')
    const[image,setImage]=useState('')
    const[plot,setPlot]=useState('')
    const[search,setSearch]=useState('')
    const[toggle, setToggle]=useState(false)
    const[star,setStars]=useState(0)
    console.log(search)
    useEffect(()=>{
        axios.get(filmEndpoint).then((response)=>{
            setFilmData(response.data);
            console.log(response.data)
        });
    },[]);

    const ratingChanged = (newRating) => {
        console.log(newRating)
        setStars(newRating);
      };
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
            rating: star
        }).then(()=>{getFilmData()});
        console.log(title+director)
      

    }
    const deletMovie=(id)=>{
        console.log("deleting"+ title)
        axios.delete(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`).then(()=>{getFilmData()})
    }
    //I use this to just clear the inputs in 
    const clearInput=()=>{
        document.getElementById('title').value=('')
        document.getElementById('date').value=('')
        document.getElementById('director').value=('')
        document.getElementById('url').value=('')  
        document.getElementById('plot').value=('')
     
      
       
    }
 const secondRender = filmData.map((movie,index)=>{
    console.log({index})
// return(<div key={index}><div>{movie.title}</div></div>)
    return(<div key={movie+index}>
        <Test m={movie}
        filmData={filmData}
        getFilmData={getFilmData}
        setFilmData={setFilmData}
        deleteMovie={deletMovie}
        toggle={toggle}
        setToggle={setToggle}
        
     
        /></div>)    
    })

    
// I'v implemented a .filter method here to sort through all of the I map over my movie API and then pass the information down to my movie component as well as functions needed to do API calls. 
    const renderMovie=filmData.filter((movie)=>{
        return search==''? movie:movie.title.includes(search)
            }).map((movie,index)=>{
                console.log({index})
        // return(<div key={index}><div>{movie.title}</div></div>)
                return(<div key={movie+index}>
                    <Movie info={movie}
                    filmData={filmData}
                    getFilmData={getFilmData}
                    setFilmData={setFilmData}
                    deleteMovie={deletMovie}
                    toggle={toggle}
                    setToggle={setToggle}
                 
                    /></div>)    
                })

    return(<div>
        <Form onSubmit={postMovie}>
            <Form.Control type='text' id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
            <Form.Control type='text' id="date" placeholder="Date" onChange={(e)=>{setDate(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='director' placeholder="Director" onChange={(e)=>{setDirector(e.target.value)}}></Form.Control>
            <Form.Control type='text' id='url'placeholder="Image URL" onChange={(e)=>{setImage(e.target.value)}}></Form.Control>
            <Form.Control as='textarea' id='plot' rows={3} placeholder="Plot"onChange={(e)=>{setPlot(e.target.value)}}></Form.Control>
            <Form.Control type='text' ide='filter' placeholder="Filter by Title" onChange={(e)=>{setSearch(e.target.value)}}></Form.Control>
            <ReactStars count={5} onChange={ratingChanged}/>
            <Button variant="primary" type='submit' onClick={clearInput}>Submit</Button>
 
        </Form>
        <Row >
        <Stack direction="horizontal" gap={3} className="d-flex flex-wrap justify-content-center">
           {renderMovie}
        </Stack>
        </Row>
        
</div>

        
    )
}