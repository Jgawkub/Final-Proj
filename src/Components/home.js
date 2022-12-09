import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Me from '../Images/Me.jpg'
export default function Home(){
    return(<div><Row className="d-flex align-items-center h">
                <Col xs={9}><div><h1>About Me</h1> A life long New Yorker, I'm a studied history at the in college and in grad school. My career up until this point has been with museuem's and non-profits, working as everything from a visitor services associate to a tour guid. Education Specialists for technology at my current job I oversee and develop any of the tecnhincal components in or exhibits: oral histories, videos and interactives. I see my past 18 weeks at Promineo as a way of increasing my skillset, either to make myself more marketable in my current field or to try and switch careers entirely. I'm fascinated by th eway technology can help people experience and learn about history... evidenced by how many hours I have on some historical video games. On a personal level, I'm always looking to expand my skillset and try something new. Some of my interests include, crafting, woodworking, model-making, pottery, bikeriding riding and when it's warm enough sailing. </div></Col>
                <Col className=" d-flex justify-content-center" xs={3}><img id="profile" src={Me}/></Col>
                
            </Row>
            </div>
 )
}