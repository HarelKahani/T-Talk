import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {
   // BrowserRouter as Router,
   // Switch,
   // Route,
    Link,
    Redirect
} from "react-router-dom";
import * as firebase from 'firebase';
let accepted_emails = ["guyhakim1@gmail.com", "shaike77@gmail.com", "arbel1992@gmail.com", "proj.t.talk@gmail.com"]
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
const firebaseConfig = {
    apiKey: "AIzaSyCJMG4k4d-wotIV-AGUSDuAqUscpDU_LMU",
    authDomain: "t-talk-game-1045a.firebaseapp.com",
    databaseURL: "https://t-talk-game-1045a.firebaseio.com",
    projectId: "t-talk-game",
    storageBucket: "t-talk-game.appspot.com",
    messagingSenderId: "215575410414",
    appId: "1:215575410414:web:ec69197d49f7cf2e7ce5ff"
  };
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage();
document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app()
    console.log(app)
});

class HomePage extends Component {
    constructor() {
        super();
        this.state = {LoggedIn: false}
        this.googleLogin = this.googleLogin.bind(this)
    }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (accepted_emails.includes(user.email)) {
                    console.log(user)
                    console.log("ACCEPTED")
                    this.setState({LoggedIn: user})
                 }
                else {
                    console.log("DENIED");
                    console.log("TRY AGAIN");
                   
                 }
            })
            .catch(console.log)
    }

    render() {
            if (this.state.LoggedIn) {
                console.log("HERE")
                console.log(this.state.LoggedIn);
                return(<Redirect to="/TherapistMenu" />);
            }
            else {
            return (
                    <div id="home_page">
                        <Link to="">
                            <Button variant="primary" size="lg" id="start_game"> התחל משחק </Button>
                        </Link>
                        <Link to="/">
                            <Button variant="primary" size="lg" id="connect" onClick={this.googleLogin} > התחבר </Button>
                        </Link>
                    </div>
            
            )
            }
    }
}
export  default HomePage ;

export {
    storage, firebase
}
