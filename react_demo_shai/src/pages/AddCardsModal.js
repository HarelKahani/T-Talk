import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Upload} from '../crads_upload/img_upload';

export class AddCardsModal extends Component {
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
        scrollable
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter"> 
          <b>הוספת תמונה</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5 style={{ textAlign: "center"}}>להוספת תמונה יש ללחוץ על "בחר תמונה" ,לאחר מכן יש לצרף שם לתמונה. לחיצה על "הוסף" תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות.
            </h5>
          <hr></hr>
          <div className="container">
            {/* <ButtonToolbar> */}
            <Upload/>
            {/* </ButtonToolbar> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


