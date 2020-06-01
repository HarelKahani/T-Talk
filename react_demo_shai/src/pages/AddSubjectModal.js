import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';





export class AddSubjectModal extends Component {
 
      onClick = ()=>{
        this.props.add();
        this.props.onHide();
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
          <div class="subj_container">
          <input class="subj_input"
          placeholder="רשום את שם הנושא כאן"
           type="text"
           name="SubjectName"
           onChange = {this.props.transferToTable}
         />
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={this.onClick} style={{ width: "20%"}}>הוסף</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


