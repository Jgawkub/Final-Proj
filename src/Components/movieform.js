import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default function MovieForm({test, postMovie}){
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"
    const [APIData,setAPIData]=useState([])
    const[title,setTitle]=useState('')
    const[date,setDate]=useState('')
    const[director,setDirector]=useState('')
    const[image,setImage]=useState('')
    const[plot,setPlot]=useState('')
  

    const getFilmData=()=>{
        axios.get(filmEndpoint).then((getFilmData)=>{
            setAPIData(getFilmData.data)
        })
    }
    // const postMovie=(e)=>{
    //     e.preventDefault()
    //     axios.post(filmEndpoint,{
    //         title,
    //         date, 
    //         director,
    //         image, 
    //         plot
    //     }).then(()=>{getFilmData()});
    //     console.log(title+director)
    // }
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
</div>

        
    )
}