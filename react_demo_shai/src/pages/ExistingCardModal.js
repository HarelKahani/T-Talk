import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Upload} from '../crads_upload/img_upload';

export class ExistingCardModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
         {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter exist">
               <b> קלפים קיימים</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5 style={{ textAlign: "center"}}> כאן מופיעים כלל הכרטיסים הקיימים בנושא הנבחר. לחיצה על "מחק" תסיר את הכרטיס הנבחר מהנושא. </h5>
          <hr></hr>
          <div className="container">
           test
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


