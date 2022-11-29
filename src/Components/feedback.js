import React,{useState,useEffect} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios";

//This component is intended toi be in an about me page, where peeople can leavefeeback about what they've seen
export default function Feedback(){
const [feedbackData, setFeedbackData]=useState([])
const [fullName, setFullName]=useState('')
const [comment, setComment]=useState('')
const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'


const getFeedbackData=()=>{
    axios.get(feedbackEndpoint).then((getFeedbackData)=>{
        setFeedbackData(getFeedbackData.data)
    })
}

const postFeedback=(e)=>{
    e.preventDefault()
    axios.post(feedbackEndpoint,{
        fullName,
        comment
    }).then(()=>{getFeedbackData()});
    console.log(fullName)
}

    
    return(<div>
        <Form>
            <Form.Control type='text' id="fullName" placeholder="Name" onChange={(e)=>setFullName(e.target.value)}> </Form.Control>
            <Form.Control type='text' id='feedback' placeholder="Feedback" onChange={(e)=>setComment(e.target.value)}></Form.Control>
            <Button variant='primary' type='submit'></Button>
        </Form>

    </div>)
}