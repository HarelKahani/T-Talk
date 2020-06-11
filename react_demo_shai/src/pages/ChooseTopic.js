import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
//import { storage } from '../pages/HomePage';
import {Redirect} from 'react-router-dom';
import HomePage, { myFirestore, storage } from './HomePage'


class ChooseTopic extends Component {
    constructor(props) { // explanation at the beginning
        super(props);
        this.getSubjectName = this.getSubjectName.bind(this);
        this.getAllSubjectNames = this.getAllSubjectNames.bind(this);
        this.startGame = this.startGame.bind(this)
        this.state = {
            gameData: this.props.location.gamedata,
            user: this.props.location.user,
            SubjectNameval: "",
            SubjectName: [],
            addModalShowForSubjUpload: false,
            gameStart: false
        }
        this.getAllSubjectNames();
    }

    startGame() {
        console.log("start game")
        console.log(this.state.user) // verify loggeduser else alert

        const itemMessage = {
            email: this.state.user.email,
            name: this.state.user.displayName,
            timeXstamp: String(new Date()),
            content: "Open Game",
        }
        console.log(itemMessage)
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
                    <Button
                        onClick={this.startGame}
                        variant="outline-primary"
                        style={{ width: "20%" }}>
                        התחל משחק
                    </Button>
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
            return (
                <div>
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
            return (<Redirect to={{pathname: "/Board", gamedata: this.state.gamedata, user: this.state.user }}/>); // pass arguments
        }
    }
}
export default ChooseTopic

