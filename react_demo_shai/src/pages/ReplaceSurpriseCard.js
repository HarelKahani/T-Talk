import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import {SurpriseHandler} from '../crads_upload/surprise_handler'





export class ReplaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cardName: this.props.cardName
    };
    
}
 
  render() {

    return (  
      <Modal
         {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"> 
    <b>{this.props.title}</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5 style={{ textAlign: "center"}}> {this.props.describe} </h5>
          <hr></hr>
          <div className="container">
            <SurpriseHandler cardName={this.state.cardName} style = {{textAlign:"center"}}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}