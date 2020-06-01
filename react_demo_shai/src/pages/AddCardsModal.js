import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import {Upload} from '../crads_upload/img_upload';
import {ImgHandler} from '../crads_upload/image_handler'

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
    <b>{this.props.title}</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5 style={{ textAlign: "center"}}> {this.props.describe} </h5>
          <hr></hr>
          <div className="container">
            {/* <ButtonToolbar> */}
            {/* <Upload
            name={"this is the name project"}
            /> */}
            <ImgHandler topicName={"My_topic_name"}/>
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


