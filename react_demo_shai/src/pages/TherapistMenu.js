import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import HomePage, { myFirestore, storage, LoggedUser } from './HomePage'
class TherapistMenu extends Component {
    constructor() {
        super();
        this.state = {gameStart: false}
        this.startGame = this.startGame.bind(this)
    }
    startGame() {
        console.log("start game")
        console.log(LoggedUser)
    
        const itemMessage = {
            email: LoggedUser.email,
            name: LoggedUser.displayName,
            timeXstamp: String(new Date()),
            content: "Open Game",
        }
        console.log(itemMessage)
            myFirestore
                .collection("Games")
                .doc(LoggedUser.email)
                .set(itemMessage)
                .then(() => {
                    console.log("written new game")
                    this.setState({gameStart: true})
                })
                .catch(err => {
                    console.log("something went wrong", err)
                })
    }
    render() {
        if (!this.state.gameStart) {
            return (
                    <div>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="/">T-Talk</Navbar.Brand>
                        <Nav className="justify-content-start" style={{ width: "100%" ,  paddingRight:"1%"}}>
                            <Nav.Link href="/ChooseTopic" style={{color: 'white', textDecoration: 'none'}}>בחירת נושא</Nav.Link>
                            <Nav.Link href="/ManageTopic" style={{color: 'white', textDecoration: 'none'}}>ניהול נושאים</Nav.Link>
                            <Nav.Link href="/ManageSupriseCard" style={{color: 'white', textDecoration: 'none'}} >ניהול כרטיסי הפתעה</Nav.Link>
                            <Nav.Link style={{color: 'white', textDecoration: 'none'}} onClick={this.startGame}>התחל משחק</Nav.Link>
                        </Nav>  
                    </Navbar>
                
                    
                </div>

                );//href="/Board"
        } else {
            return (<Redirect to="/Board"/>);
        }
       

    }
}



export default TherapistMenu