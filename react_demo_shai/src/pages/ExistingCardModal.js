import React, { Component } from 'react';
import {Table, Modal, Button} from 'react-bootstrap';
import {CardsTable} from './CardsTable'
import {ListOfTopicImg} from '../crads_upload/list_topic'

export class ExistingCardModal extends Component {
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
        scrollable>

          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter exist">
                <b> קלפים קיימים</b>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <h5 style={{ textAlign: "center"}}>להצגת הקלפים עבור הנושא הנבחר יש ללחוץ על "הצג תמונות", מיד עם הלחיצה יופיעו כלל הכרטיסים הקיימים בנושא הנבחר. לחיצה על "X" תסיר את הכרטיס הנבחר מהנושא. </h5>
            <hr></hr>
            <div className="container">
              <Table striped bordered hover>
                  <ListOfTopicImg topicname={this.state.topicName}/>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} style={{ width: "20%"}}>סגור מסך</Button>
          </Modal.Footer>
      </Modal>
    );
  }
}


