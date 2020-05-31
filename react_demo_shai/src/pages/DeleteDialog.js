import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Upload} from '../crads_upload/img_upload';

export class DeleteDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
         {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter exist">
               <b>האם למחוק נושא?</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5 style={{ textAlign: "center"}}>מחיקת נושא הינה פעולה בלתי הפיכה-הנושא יימחק לצמיתות </h5>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide} style={{ width: "20%"}}>מחק</Button>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


