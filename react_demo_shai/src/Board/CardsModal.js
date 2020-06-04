import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';



export class CardsModal extends Component {
    constructor(props) {
        super(props);
        //this.getSubjectName = this.getSubjectName.bind(this);
        //this.addSubject = this.addSubject.bind(this);
        this.state = { counter: 0 }
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
                           <img src="/cards_imgs/1.JPG"></img>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" onClick={this.props.onHide} style={{ width: "20%" }}>המשך</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        );
    }
}


