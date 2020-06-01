import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';

class TherapistMenu extends Component {

    render() {
        return (
            <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">T-Talk</Navbar.Brand>
                <Nav className="justify-content-start" style={{ width: "100%" ,  paddingRight:"1%"}}>
                    <Nav.Link href="/ChooseTopic" style={{color: 'white', textDecoration: 'none'}}>בחירת נושא</Nav.Link>
                    <Nav.Link href="/ManageTopic" style={{color: 'white', textDecoration: 'none'}}>ניהול נושאים</Nav.Link>
                    <Nav.Link href="/ManageSupriseCard" style={{color: 'white', textDecoration: 'none'}} >ניהול כרטיסי הפתעה</Nav.Link>
                    <Nav.Link href="/Board" style={{color: 'white', textDecoration: 'none'}} >התחל משחק</Nav.Link>
                </Nav>
            </Navbar>
        
             
         </div>

        );
       

    }
}



export default TherapistMenu