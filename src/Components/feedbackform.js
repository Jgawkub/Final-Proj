import React,{useState,useEffect} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import Feedback from "./feedback";


//This component is intended for peeople to leavefeeback about what they've seen
export default function FeedbackForm(){
const [feedbackData, setFeedbackData]=useState([])
const [fullName, setFullName]=useState('')
const [comment, setComment]=useState('')
const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'

//Similar Situation I am using a bunch of API calls here as I could't quite figure out how to make all the API calls in another component and call them here. Little more wordy
useEffect(()=>{
    axios.get(feedbackEndpoint).then((response)=>{
        setFeedbackData(response.data);
        console.log(response.data)
    });
},[]);

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
    }).then(()=>{getFeedbackData();clearInput1()});
    console.log(fullName)
}
//clears my form inputs to look neater. 
const clearInput1=()=>{
    document.getElementById('fullName').value=('')
    document.getElementById('comment').value=('')
}
const deleteFeedback=(id)=>{
    console.log('deleting'+fullName)
    axios.delete(feedbackEndpoint+`/${id}`).then(()=>{getFeedbackData()})
}
    
//Just like in the movie components im mapping whaterver information is in my feedback API
const comments=feedbackData.map((f,index)=>{
    return(<div key={f+index}>
        <br/> <Feedback info={f}
        fullName={fullName}
        setFullName={setFullName}
        comment={comment}
        setComment={setComment}
        feedbackData={feedbackData}
        setFeedbackData={setFeedbackData}
        getFeedbackData={getFeedbackData}
        deleteFeedback={deleteFeedback}/></div>)
})

    return(<div><h3 className="headings">Thank you for visiting my page and checking out my final project. Please leave your thoughts, below!</h3>
       <br/>
       <div  className="d-flex justify-content-center">
        <Form className='w-50' onSubmit={postFeedback}>
            <Form.Control type='text' id="fullName" placeholder="Name" onChange={(e)=>setFullName(e.target.value)}></Form.Control>
            <Form.Control as='textarea' id="comment" placeholder="comment" onChange={(e)=>setComment(e.target.value)}></Form.Control>
            <Button variant="primary" className="submit" type='submit'>Submit</Button>
        </Form>
        </div>
        {comments}
       
                </div>)
}