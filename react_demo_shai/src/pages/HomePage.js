import React, { Component } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { BrowserRouter as Link, Redirect } from "react-router-dom";
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
firebase.firestore().settings({
    timestampsInSnapshots: true
})
const myFirestore = firebase.firestore()
const storage = firebase.storage();
document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app()
   // console.log(app)
});

class HomePage extends Component {
    constructor() {
        super();
        this.state = { LoggedIn: false, FoundGame: false }
        this.googleLogin = this.googleLogin.bind(this)
        this.joinGame = this.joinGame.bind(this)
    }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (accepted_emails.includes(user.email)) {
                  //  console.log(user)
                  //  console.log("ACCEPTED")
                    this.setState({ LoggedIn: user })
                }
                else {
                 //   console.log("DENIED");
                 //   console.log("TRY AGAIN");
                 alert("משתמש אינו מוכר, יש לפנות למנהל המערכת")
                    // alert unrecognized user
                }
            })
            .catch(console.log) //recieve error and alert it
    }
    joinGame() {
        let GamesRef = myFirestore.collection('Games');
        let query = GamesRef.get()
            .then(snapshot => {
                if (snapshot.empty) {
                  //  console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    let queryTime = new Date(doc.data().timeXstamp)
                 //   console.log(queryTime)
                    let now = new Date()
                    let timedelta = (now - queryTime) / 1000
<<<<<<< HEAD
                    console.log(timedelta)
                    if (timedelta < 60 && doc.data().content == "Open Game") {
                        console.log(`Joining ${doc.data().name}'s game`)
=======
                 //   console.log(timedelta)
                    if (timedelta < 300 && doc.data().content == "Open Game" && !this.state.FoundGame) {
                     //   console.log(`Joining ${doc.data().name}'s game`)
>>>>>>> 1ce1225efa1c68a13b6091f4e9e3591609767cb0
                        this.setState({ FoundGame: doc.data() })
                        myFirestore
                        .collection("Games")
                        .doc(doc.data().email)
                        .update({ content: "Closed Game" })
                        .then(() => {
                      //      console.log("changed game status")
                        })
                        .catch(err => {
                            console.log("something went wrong", err)
                        })
                    }
                    else {
                     //   console.log("No recent game found")
                    }
                });
                if (!this.state.FoundGame) {
                    alert("אין משחק פעיל ברגע זה. נא להמתין למטפל/ת")
                }
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
    render() {
        if (this.state.FoundGame) {
            return (<Redirect to={{ pathname: "/User_Board", gamedata: this.state.FoundGame, user: this.state.LoggedIn }} />);
        }
        if (this.state.LoggedIn) {
         //   console.log("HERE")
         //   console.log(this.state.LoggedIn);
            return (<Redirect to={{ pathname: "/ChooseTopic", LoggedIn: this.state.LoggedIn }} />); // give LoggedIn as argument
        }
        else {
            return (
                <div style={{
                    position: "fixed",
                    backgroundColor: "grey",
                    backgroundImage: `url(cards_imgs/homePageBG.jpg)`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "100%",
                    display: "block"
                }}>
                    <header className="jumbotron_text_center">
                        <img src="/cards_imgs/logo.png" className="main_pic"></img>
                    </header>

                    <div className="menu_btn">
                        <Link to="/">
                            <OverlayTrigger
                                trigger="hover"
                                key="top"
                                placement="top"
                                overlay={
                                    <Popover id={`popover-positioned-${this.placement}`}>
                                        <Popover.Title as="h3">{"כניסה לרשומים בלבד"}</Popover.Title>
                                        <Popover.Content>
                                            על מנת להתחבר למשחק עליך להרשם באמצעות מייל דרך בעלת האתר
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="t-talk" size="lg" id="connect" onClick={this.googleLogin} > התחבר </Button>
                            </OverlayTrigger>
                        </Link>
                        <Link to="">
                            <OverlayTrigger
                                trigger="hover"
                                key="bottom"
                                placement="bottom"
                                overlay={
                                    <Popover id={`popover-positioned-${this.placement}`}>
                                        <Popover.Title as="h3">{"רק עוד קצת ומתחילים"}</Popover.Title>
                                        <Popover.Content>
                                            עליך להמתין עד לקבלת אישור כניסה מהמטפל/ת ולאחר מכן ללחוץ על "התחל משחק"
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <Button variant="t-talk" size="lg" id="start_game" onClick={this.joinGame}> התחל משחק </Button>
                            </OverlayTrigger>

                        </Link>
                    </div>
                </div>

            )
        }
    }
}

export default HomePage
export { storage, firebase, myFirestore }