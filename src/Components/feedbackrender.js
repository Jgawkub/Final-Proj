import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'

export default function FeedbackRender({info, feedbackData, getFeedbackData, deleteFeedback }){

    return(<div>
        <Button variant="danger" onClick={()=>deleteFeedback(info.id)}>Delete</Button>
        {info.fullName}
        {info.comment}
    </div>)


}