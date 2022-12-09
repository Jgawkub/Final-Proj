import React,{useState, useEffect} from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Movie from "./movie";

export default function Feedback({ info, fullName, comment, setComment, setFullName, feedbackData, getFeedbackData, deleteFeedback,setFeedbackData }){
    const [editBox,setEditBox]=useState(false)
    const feedbackEndpoint= 'https://6352caffd0bca53a8eb55114.mockapi.io/feedback'
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nfullName, setNFullName]=useState('');
    const [ncomment, setNComment]=useState('');





useEffect(()=>{
    axios.get(feedbackEndpoint).then((response)=>{
    
        setFeedbackData(response.data);
        feedbackData.filter(form=>form.id===info.id).map((form,index)=>{
            setNFullName(form.fullName)
            console.log(form.fullName)
            setNComment(form.comment)
            console.log(form.comment)
        })
           
     });
},[]);


const updateFeedback=(id,e)=>{
    console.log(`updating + ${id}`)
    axios.put(feedbackEndpoint+`/${id}`,{
        fullName: nfullName,
        comment: ncomment
    }).then(()=>{getFeedbackData()})
   
}



    return(<div>
  
{/* I grabbed this Modal from the React Bootstrap so that when you edid a little pop up shows with your comments to change. Done for the little UI flair.   */}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your comment here! </Modal.Title>
        </Modal.Header>
            <Modal.Body> 
               <Form.Control type="text" placeholder="Name" className="w-auto" onChange={(e)=>setNFullName(e.target.value)} ></Form.Control> 
                <br/>
                <textarea className="w-100" placeholder="Updated Comment" onChange={(e)=>setNComment(e.target.value)}></textarea>
                <br/>
            </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button id="close" variant="custom" className="close" onClick={handleClose}><i className="bi bi-x-square"></i></Button>
                        <Button id="submit" variant="custom" className="submit" onClick={()=>{updateFeedback(info.id);handleClose()}}><i className="bi bi-send"></i></Button>
                    </ButtonGroup>
                        
                </Modal.Footer>
      </Modal>
      
      <Row className="feedbackrow">
        <Col></Col>
        <Col>
            <Card className="fcard">
                <Card.Body className="cardbody">
                    <Card.Text className= 'd-flex justify-content-left'>{info.fullName}-
                    <br/>{info.comment}</Card.Text>
                        <ButtonGroup className="d-flex justify-content-center">
                            <Button variant="custom" id="delete"  className="delete" onClick={()=>deleteFeedback(info.id)}><i className="bi bi-trash3"></i></Button>
                            <Button variant="custom" id="edit" className="edit" onClick={handleShow}><i className="bi bi-pencil"></i></Button>
                        </ButtonGroup>
                    </Card.Body>
             </Card>
        </Col>
        <Col></Col>
        </Row>
    </div>)


}