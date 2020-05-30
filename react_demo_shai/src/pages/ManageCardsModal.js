import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Upload} from './../crads_upload/img_upload'

export class ManageCardsModal extends Component {
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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ניהול קלפים
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {/* <ButtonToolbar> */}
            <Upload/>
            {/* </ButtonToolbar> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


