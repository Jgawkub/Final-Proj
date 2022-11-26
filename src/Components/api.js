import axios from 'axios'
import React,{useState, useEffect} from 'react';
import MovieForm from './movieform';

export default function APIcalls(){
    const [ApiData, setAPIData]=useState([])
    const filmEndpoint= "https://6352caffd0bca53a8eb55114.mockapi.io/films"

    const testing = ()=>{
        console.log("Test")
    }

    useEffect(()=>{
        axios.get(filmEndpoint).then((response)=>{
            setAPIData(response.data);
            console.log(response.data)
        });
    },[]);

    const getFilmData=()=>{
        axios.get(filmEndpoint).then((getFilmData)=>{
            setAPIData(getFilmData.data)
        })
    }

    const postMovie=(e)=>{
        e.preventDefault()
        axios.post(filmEndpoint,{
            title,
            date, 
            director,
            image, 
            plot
        }).then(()=>{getFilmData()});
        console.log(title+director)
        console.log('working')
    }
    
    return(<div><MovieForm test={testing} postMovie={postMovie}/></div>)
    
}