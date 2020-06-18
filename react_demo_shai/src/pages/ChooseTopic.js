import React, { Component } from 'react';
import { Button, Table, OverlayTrigger, Popover } from 'react-bootstrap';
//import { storage } from '../pages/HomePage';
import { Redirect } from 'react-router-dom';
import HomePage, { myFirestore, storage } from './HomePage'
import * as firebase from 'firebase';


let accepted_emails = ["guyhakim1@gmail.com", "shaike77@gmail.com", "arbel1992@gmail.com", "proj.t.talk@gmail.com"]


class ChooseTopic extends Component {
    constructor(props) { // explanation at the beginning
        super(props);
        this.getSubjectName = this.getSubjectName.bind(this);
        this.getAllSubjectNames = this.getAllSubjectNames.bind(this);
        this.startGame = this.startGame.bind(this)
        this.googleLogin = this.googleLogin.bind(this)
        this.state = {
            gameData: false,
            user: this.props.location.LoggedIn,
            SubjectNameval: "",
            SubjectName: [],
            addModalShowForSubjUpload: false,
            gameStart: false,
            FoundGame: false
        }
        this.getAllSubjectNames();
    }
    googleLogin(topic) {
        if (this.state.user !== undefined) {
            console.log(`in return ----> ${this.state.user}`);
            this.startGame(topic);
            return;
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user
                if (accepted_emails.includes(user.email)) {
                    console.log(user)
                    console.log("ACCEPTED")
                    this.setState({ user: user })
                    this.startGame(topic);
                }
                else {
                    console.log("DENIED");
                    console.log("TRY AGAIN");
                    // alert unrecognized user
                }
            })
            .catch(console.log) //recieve error and alert it
    }


    startGame(topic) {
        const itemMessage = {
            email: this.state.user.email,
            name: this.state.user.displayName,
            timeXstamp: String(new Date()),
            content: "Open Game",
            topic: topic,
            cube: -1,
            childSquare: "button1",
            therapistSquare: "button1",
            currentCard: -1
        }

        this.setState({ gameData: itemMessage })
        myFirestore
            .collection("Games")
            .doc(this.state.user.email)
            .set(itemMessage)
            .then(() => {
                console.log("written new game")
                this.setState({ gameStart: true })
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    }

    getAllSubjectNames = () => {
        let topics = storage.ref('topics/')
        console.log(topics)
        return topics.listAll().then(event => {
            let list = event.prefixes
            console.log(list);
            list.map((item, index) => {
                this.setState({
                    SubjectName: this.state.SubjectName.concat(item.name)
                })
            })
        }).catch(err => {
            console.log(err)
        });
    }

    getSubjectName = event => {
        this.setState({ SubjectNameval: event.target.value });
    };

    showRow = (i) => {
        let topics = this.state.SubjectName
        return topics.map((item, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td > {item} </td>
                <td>
                    <OverlayTrigger
                        trigger="hover"
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id={`popover-positioned-${this.placement}`}>
                                <Popover.Title as="h3">{`שימו ❤️`}</Popover.Title>
                                <Popover.Content>
                                     יש לדאוג כי המטופל קיבל את הלינק הבא
                                     <br></br>
                                     <strong>https://game-t-talk.web.app</strong>
                                     <br></br>
                                     ולוודא כי נבחרה האפשרות של "התחל משחק"
                                     </Popover.Content>
                            </Popover>
                        }
                    >
                        <Button
                            onClick={e => this.googleLogin(item)}
                            variant="outline-primary"
                            style={{ width: "20%" }}>
                            התחל משחק
                         </Button>
                    </OverlayTrigger>
                </td>
            </tr>
        })
    }

    showAllRows = () => {
        let all = new Object;
        console.log("here")
        for (let i = 0; i < this.state.SubjectName.length; i++) {
            all.insert(this.showRow(i))
        }
        return all
    }


    render() {

        if (!this.state.gameStart) {
            console.log(this.state.user)
            return (
                <div className="topic-table">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th >#</th>
                                <th>שם הנושא</th>
                                <th>בחר נושא</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showRow()}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (<Redirect to={{ pathname: "/User_Board", gamedata: this.state.gameData, user: this.state.user }} />); // pass arguments
        }
    }
}
export default ChooseTopic

