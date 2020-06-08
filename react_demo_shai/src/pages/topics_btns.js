
import React, { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { AddCardsModal } from './AddCardsModal'
import { ExistingCardModal } from './ExistingCardModal'
import { DeleteDialog } from './DeleteDialog'

export class TopicsButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicName: this.props.topicName,
            SubjectNameval: "" ,
            SubjectName: ["Shai's_topic"], 
            addModalShowForUpload: false, 
            addModalShowForExisting: false, 
            addModalShowForSubjUpload: false 
        }
        this.getSubjectName = this.getSubjectName.bind(this);
        this.addSubject = this.addSubject.bind(this);
    };
    
    getSubjectName = event => {
        this.setState({ SubjectNameval: event.target.value });
    };
    
    addSubject = ()=>{
        if(this.state.SubjectNameval===""){
            alert("יש להזין שם")
            return;
        }
        this.setState({SubjectName: this.state.SubjectName.concat(this.state.SubjectNameval)})
        console.log(this.state)
    }
    
    render(){
        let addModalCloseUpload = () => this.setState({ addModalShowForUpload: false });
        let addModalCloseExisting = () => this.setState({ addModalShowForExisting: false });
        let addModalCloseDelete = () => this.setState({ addModalShowForDelete: false });

        return(
            <ButtonToolbar>
            <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
            <AddCardsModal
                topicName={this.state.topicName}
                show={this.state.addModalShowForUpload}
                onHide={addModalCloseUpload}
                title={"הוספת תמונה"}
                describe={"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}
            />
            <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShowForExisting: true })} >קלפים קיימים</Button>
            <ExistingCardModal
                topicName={this.state.topicName}
                show={this.state.addModalShowForExisting}
                onHide={addModalCloseExisting}
            />
            <Button variant="outline-primary" id="delete_subject" onClick={() => this.setState({ addModalShowForDelete: true, isSubject: true })} >מחק נושא</Button>
            <DeleteDialog
                topicName={this.state.topicName}
                show={this.state.addModalShowForDelete}
                onHide={addModalCloseDelete}
            />
        </ButtonToolbar>
        )
    }
}



                              