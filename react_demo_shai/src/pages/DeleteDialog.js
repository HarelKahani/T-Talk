import React, { Component } from 'react';
import { Modal, Button, Alert} from 'react-bootstrap';
import { storage } from '../pages/HomePage';


export class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        topicName: this.props.topicname,
    }
  }

  deleteTopic = () => {
    console.log(`topic ${this.state.topicName} was not deleted yet`);
    storage.ref(`topics/${this.state.topicName}`).listAll()
    .then((event) =>{
      var list = event.items;
      list.map((item) =>{
        item.delete().then(()=>{
          console.log(`${item.name} was deleted`)
        }).catch((err)=> {
          console.log(err)
        });
      })
    }).catch((err) =>{
      console.log(err);
    });
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
            <b>{this.props.title}</b>
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5 style={{ textAlign: "center"}}>{this.props.describe}</h5>
          <p style={{textAlign:"center"}}>הנושא שיימחק הוא {this.props.topicname}</p>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {this.deleteTopic(); this.props.onHide()}} style={{ width: "20%"}}>מחק</Button>
          <Button onClick={this.props.onHide} style={{ width: "20%"}}>ביטול</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


