import React,{useState,useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios";
import Movie from "./movie";
import Stack from 'react-bootstrap/Stack';
import ReactStars from "react-rating-stars-component";




//To Do still:
//1. Do a filter method that would allow people to select movies based on a particular criteria. Separate component? Did this. How to make this into something that I can do on click.
//2.  If time, create a way to push films to add selected films to like a to a too watch list. 
//3. When somone clicks on a movie card, it takes them to just a singular vision. 
//4. Let people edit the movie details?

//In this component I handle my posting and getting data. I load all my movie info to an API. All these states are a little verbose, could I put these in the API itself? 
export default function MovieForm({test,filmData,setFilmData}){
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"
    const[title,setTitle]=useState('')
    const[date,setDate]=useState(0)
    const[director,setDirector]=useState('')
    const[image,setImage]=useState('')
    const[plot,setPlot]=useState('')
    const[search,setSearch]=useState('')
    const[review,setReview]=useState('')
    const[star,setStar]=useState(null)



    useEffect(()=>{
        axios.get(filmEndpoint).then((response)=>{
            setFilmData(response.data);
            console.log(response.data)
        });
    },[]);

  const ratingChanged = (newRating) => {
        console.log(newRating)
        setStar(newRating);
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
            review,
            star,
        }).then(()=>{getFilmData(); clearInput()});
        console.log(title+director)
       
    }
const deletMovie=(id)=>{
        console.log("deleting"+ id)
        axios.delete(`https://6352caffd0bca53a8eb55114.mockapi.io/films/${id}`).then(()=>{getFilmData()})
    }
    // I use this to just clear the inputs in my post. 
const clearInput=()=>{
        document.getElementById('title').value=('')
        document.getElementById('year').value=('')
        document.getElementById('director').value=('')
        document.getElementById('url').value=('')  
        document.getElementById('plot').value=('')
        document.getElementById('review').value=('')
        document.getElementById('stars').value=(0)
    }


    
// I'v implemented a .filter method here to sort through all of the I map over my movie API and then pass the information down to my movie component as well as functions needed to do API calls. I am passing an ungodly amount of stuff down here to my Movie object. 
    const renderMovie=filmData.filter((movie)=>{
        return search.toLowerCase() ===''? movie:movie.title.toLowerCase().includes(search)
        }).map((movie,index)=>{
                return(<div key={index}>
                    <Movie info={movie}
                    filmData={filmData}
                    getFilmData={getFilmData}
                    setFilmData={setFilmData}
                    deleteMovie={deletMovie}
                    title={title}
                    date={date}
                    director={director}
                    image={image}
                    review={review}
                    plot={plot}
                    star={star}
                    /></div>)    
                })

    return(
    <>
     <h3 className="headings">Below are some of my favorite movies. Why don't you add your own!</h3>
     <Row>
     <Col></Col>
     <Col xs={8}>
        <Dropdown>
            <div className="d-grid gap-2">
          <Dropdown.Toggle id="dropdown" size='lg'>DropDown</Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
                    <Form onSubmit={postMovie} style={{padding:'10px'}}>
                    <Form.Control type='text' id="title" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
                    <Form.Control type='number' id="year" placeholder="Date" onChange={(e)=>{setDate(e.target.value)}}></Form.Control>
                    <Form.Control type='text' id='director' placeholder="Director" onChange={(e)=>{setDirector(e.target.value)}}></Form.Control>
                    <Form.Control type='text' id='url'placeholder="Image URL" onChange={(e)=>{setImage(e.target.value)}}></Form.Control>
                    <Form.Control as='textarea' id='plot' rows={3} placeholder="Plot"onChange={(e)=>{setPlot(e.target.value)}}></Form.Control>
                    <Form.Control as='textarea' id='review' rows={3} placeholder="Review"onChange={(e)=>{setReview(e.target.value)}}></Form.Control>
                    <ReactStars id='stars' count={5} size={24} onChange={ratingChanged} />
                    <Dropdown.Item  as="button"><Button className="submit" variant="primary" type='submit'><i className="bi bi-send"></i></Button></Dropdown.Item>
                </Form>
            </Dropdown.Menu>
        </div>
        </Dropdown>
    </Col>
    <Col></Col>
    </Row>
        <br/>
        <div className="d-flex justify-content-center">
            <Form.Control className="w-50" type='text' id='filter' placeholder="Filter by Title (lower case)" onChange={(e)=>{setSearch(e.target.value)}}></Form.Control>
        </div>
        <br/>
    <Row>
        <Stack direction="horizontal" gap={3} className="d-flex flex-wrap justify-content-center">
            {renderMovie}
        </Stack>
    </Row>
        
</>

        
    )
}