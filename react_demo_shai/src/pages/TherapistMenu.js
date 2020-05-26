import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import ChooseTopic from './ChooseTopic';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class TherapistMenu extends Component {

    render() {
        return (
            <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">T-Talk</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/ChooseTopic">בחירת נושא</Nav.Link>
                    <Nav.Link href="">ניהול נושאים</Nav.Link>
                    <Nav.Link href="">ניהול כרטיסי הפתעה</Nav.Link>
                </Nav>
            </Navbar>
        
             
         </div>

        );
       

    }
}



export default TherapistMenu

