import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {storage} from '../pages/HomePage'

//define the amount of cards in one pack rotine
const CARDS_LIMIT=16;

export class CardsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            counter: 1,
            list: null,
            arr: [],
            topicName: "Shai's_topic"
            // topicName: this.props.topicname
        }
        this.getList = this.getList.bind(this);

    }

    getList = () => {
        return storage.ref(`topics/${this.state.topicName}`).listAll()
        .then((event)=> {
            console.log(event.items)
            this.state.list = event.items
            console.log(this.state.list)
        }).then(()=>{
            let arr = []
            for(let j=0; j< this.state.list.length; j++){
                let obj = {}
                this.state.list[j].getDownloadURL()
                .then( url => {
                    obj.url = url;
                }).then(() =>{
                    obj.name = this.state.list[j].name.replace(".JPG", "").replace(".jpg", "").replace(".png", "")
                    obj.index = `${j+1}`
                    arr.push(obj)
                    this.state.arr = arr
                });  
            }
            console.log(this.state.arr)
            console.log(this.state.counter)
        });
    }


    onClick = () => {
        this.getList();
        this.props.onHide();
        this.setState( {counter: this.state.counter += 1});
        if(this.state.counter > CARDS_LIMIT){
            this.setState( {counter: 0});
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
                            <b>משימה</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={"../cards/public/1.jpg"}></img>
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