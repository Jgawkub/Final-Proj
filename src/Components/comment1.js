import React,{useState} from "react";
import Button from "react-bootstrap/Button"




export default function Comment1(){
const [commentBox, setCommentBox]=(useState(false))

const renderComment=()=>{
    console.log("Commenting")
    setCommentBox(true)
    console.log(commentBox)
}


    return(<Button variant="primary"
    )
}