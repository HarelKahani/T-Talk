import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';
import {ImgHandler} from '../crads_upload/image_handler'




export class AddCardsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topicName: this.props.topicName
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
            <p style={{ textAlign: "center"}}><b>{"שימו לב - המאגר הינו מאגר משותף אין להוסיף תמונות או פרטים אישיים של מטופלים! "}</b></p>
            <div className="container">
            <ImgHandler topicName={this.state.topicName}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


