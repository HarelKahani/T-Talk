import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { storage } from '../pages/HomePage';


export class AddSubjectModal extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        topicName: '',
        url: ''
    };
    this.addtopic = this.addtopic.bind(this)
  }

  getName = event =>{
    this.props.transferToTable(event);
    let name = event.target.value
    this.setState({
        topicName: name 
    });
  //  console.log(this.state)
  }

  addtopic = () => {
    const uploadTask = storage.ref(`topics/${this.state.topicName}/init.txt`).putString("temp_init");
    uploadTask.on('state_changed',
    (snapshot) => {
     //   console.log("in progress")
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
     //   console.log(progress)
    },
    (error) =>{
    //    console.log("error")
        console.log(error);
    },
    () => {
        storage.ref(`topics/${this.state.topicName}/init.txt`).getDownloadURL()
        .then(url => {
       //     console.log("ok")
       //     console.log(url);
            this.setState({url});
        })
    });

  }

 
  onClick = ()=>{
    this.addtopic();
    // this.props.transferToTable
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
            onChange = {this.getName}
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


