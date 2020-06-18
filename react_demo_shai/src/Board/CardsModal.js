import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { storage } from '../pages/HomePage'

//define the amount of cards in one pack rotine
const CARDS_LIMIT = 16;

export class CardsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            surprise_count: 0,
            list: null,
            arr: [],
            topicName: "Shai's_topic",
            kind: this.props.kind,
            gameData: this.props.gamedata,
            cards : this.props.cards,
            surprises: this.props.surprises,
            // topicName: this.props.topicname
        }
        // this.getList = this.getList.bind(this);

    }

    onClick = () => {
        // this.getList();
        this.props.onHide();
        if(this.state.kind == "task"){
            this.setState({ counter: this.state.counter += 1 });
            if (this.state.counter >= this.props.cards.length) {
                this.setState({ counter: 0 });
            }
        }
        else if(this.state.kind == "surprise"){
            this.setState({ surprise_count: this.state.surprise_count += 1 });
            if (this.state.surprise_count >= this.props.surprises.length) {
                this.setState({ surprise_count: 0 });
            }
        }
    }

    showCard = () => {
        console.log("showing cards")
        if(this.state.kind == "task"){
            console.log("props cards",this.props.cards)
            console.log("state cards", this.state.list)
            if (this.props.cards.length > 0){
                return <img src={this.props.cards[this.state.counter].url}></img>
            }
        }
        else if(this.state.kind == "surprise"){
            console.log("props surprise",this.props.surprises)
            console.log("state surprise", this.state.list)
            if (this.props.surprises.length > 0){
                // if(!this.props.surprises[this.state.surprise_count].board){
                    return <img src={this.props.surprises[this.state.surprise_count].url}></img>
                // }
            }
        }
    }

    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                //scrollable
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <b>{this.props.title}</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 style={{ textAlign: "center" }}> {this.props.describe} </h5>
                        <hr></hr>
                        <div className="img_input">
                            {this.showCard()}
                            {this.state.kind}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.onClick} style={{ width: "20%" }}>המשך</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


// `${this.state.arr[this.state.counter].url}`