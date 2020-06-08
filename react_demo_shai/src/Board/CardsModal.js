import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

//define the amount of cards in one pack rotine
const CARDS_LIMIT=16;

export class CardsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 1 }
    }
    onClick = () => {
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
                        <img src={`/cards_imgs/${this.state.counter}.JPG`} alt=""></img>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.onClick} style={{ width: "20%" }}>המשך</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


