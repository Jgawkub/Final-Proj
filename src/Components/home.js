import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Me from '../Images/Me.jpg'
export default function Home(){
    return(<div><Row xs={2} className="d-flex align-items-center h">
                <Col xs={9}><div><h1>About Me</h1> A life long New Yorker, I  studied history at the college and post-grad levels. My career up until this point has been with museums and non-profits, working as everything from a visitor services associate to a tour guide. Education Specialist for technology at my current job I oversee and develop any of the tecnhincal components used in exhibits: oral histories, videos and interactives. I see my past 18 weeks at Promineo as a way of increasing my skillset, either to make myself more marketable in my current field or in something new entirely. I'm fascinated by the way technology can help people experience and learn about history. On a personal level, I'm always looking to expand my skillset and try something new. Some of my interests include, crafting, wood working, model-making, pottery, bike riding and when it's warm enough sailing. </div></Col>
                <Col className="d-flex justify-content-right" xs={3}><img id="profile" src={Me}/></Col>
                
            </Row>
            </div>
 )
}