import React,{useState} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function FeedbackRender({info, fullName, comment, setComment, setFullName, feedbackData, getFeedbackData, deleteFeedback }){
    const [editBox,setEditBox]=useState(false)
    const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'


//Have my update function in tis component, this may not have been needed and I could it passed down as props, but I feel I am already passing down so many things to it thats  things as props. 
const updateFeedback=(id,e)=>{
    e.preventDefault()
    console.log(`updating + ${id}`)
    axios.put(feedbackEndpoint+`/${id}`,{
        fullName,
        comment
    }).then(()=>{getFeedbackData()})
}

    return(<div>
        <Button variant="danger" onClick={()=>deleteFeedback(info.id)}>Delete</Button>
        <Button variant="success" onClick={()=>setEditBox(true)}>Edit</Button>
        {editBox === true ? <div>
      
            <input type="text"placeholder="Name" onChange={(e)=>setFullName(e.target.value)}></input>
            <input type='textarea' placeholder="Updated Comment" onChange={(e)=>setComment(e.target.value)}></input>
            <Button type="submit" onClick={()=>updateFeedback(info.id)}>Submit</Button>
            </div>:null}
        {info.fullName}
        {info.comment}
    </div>)


}