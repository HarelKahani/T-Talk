import React, { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { AddCardsModal } from './AddCardsModal'
import { ExistingCardModal } from './ExistingCardModal'
import { DeleteDialog } from './DeleteDialog'
import { AddSubjectModal } from './AddSubjectModal'



class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.getSubjectName = this.getSubjectName.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.state = {  SubjectNameval: "" , SubjectName: [], addModalShowForUpload: false, addModalShowForExisting: false, addModalShowForSubjUpload: false }
    }

    getSubjectName = event => {
        this.setState({ SubjectNameval: event.target.value });
    };
    
    addSubject = ()=>{
        if(this.state.SubjectNameval===""){
            alert("יש להזין שם")
            return;
        }
        this.setState({SubjectName: this.state.SubjectName.concat(this.state.SubjectNameval)})
    }
    
    render() {
        let addModalCloseUpload = () => this.setState({ addModalShowForUpload: false });
        let addModalCloseExisting = () => this.setState({ addModalShowForExisting: false });
        let addModalCloseDelete = () => this.setState({ addModalShowForDelete: false });
        let addModalCloseSubjecUp = () => this.setState({ addModalShowForSubjUpload: false });
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th >#</th>
                            <th>שם הנושא</th>
                            <th>ניהול נושא</th>
                            {/* <th>הוספת תמונה</th> */}
                        </tr>
                    </thead>
                    <tbody>
                         <tr>
                            <td>1</td>
                            <td > {this.state.SubjectName[0]} </td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe={"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}
                                    />
                                    <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShowForExisting: true })} >קלפים קיימים</Button>
                                    <ExistingCardModal
                                        show={this.state.addModalShowForExisting}
                                        onHide={addModalCloseExisting}
                                    />
                                    <Button variant="outline-primary" id="delete_subject" onClick={() => this.setState({ addModalShowForDelete: true, isSubject: true })} >מחק נושא</Button>
                                    <DeleteDialog
                                        show={this.state.addModalShowForDelete}
                                        onHide={addModalCloseDelete}
                                    />

                                </ButtonToolbar>
                            </td>

                        </tr>
                       {/* <tr>
                            <td>2</td>
                            <td>הגייה של האות ש</td>
                            <td>

                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe={"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

                                    />
                                    <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShowForExisting: true })} >קלפים קיימים</Button>
                                    <ExistingCardModal
                                        show={this.state.addModalShowForExisting}
                                        onHide={addModalCloseExisting}
                                    />
                                    <Button variant="outline-primary" id="delete_subject" onClick={() => this.setState({ addModalShowForDelete: true })} >מחק נושא</Button>
                                    <DeleteDialog
                                        show={this.state.addModalShowForDelete}
                                        onHide={addModalCloseDelete}
                                    />

                                </ButtonToolbar>

                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td >{this.state.SubjectName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe={"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

                                    />
                                    <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShowForExisting: true })} >קלפים קיימים</Button>
                                    <ExistingCardModal
                                        show={this.state.addModalShowForExisting}
                                        onHide={addModalCloseExisting}
                                    />
                                    <Button variant="outline-primary" id="delete_subject" onClick={() => this.setState({ addModalShowForDelete: true })} >מחק נושא</Button>
                                    <DeleteDialog
                                        show={this.state.addModalShowForDelete}
                                        onHide={addModalCloseDelete}
                                    />



                                </ButtonToolbar>

                            </td>
                        </tr> */}
                    </tbody>
                </Table>

                <Button variant="primary" id="add_subj" onClick={() => this.setState({ addModalShowForSubjUpload: true })}>הוסף נושא</Button>
                <AddSubjectModal
                describe={"להוספת נושא יש להזין טקסט בתיבת הטקסט המופיע מתחת. לחיצה על 'הוסף' תוסיף את הנושא אל מאגר הנושאים הקיים.."}
                    title={"הוספת נושא"}
                    show={this.state.addModalShowForSubjUpload}
                    onHide={addModalCloseSubjecUp}
                    transferToTable={this.getSubjectName}
                    add={this.addSubject}
                />
                {/* <AddCardsModal
                    subjectName=""
                    title={"הוספת נושא"}
                    describe = {"להוספת נושא יש לצרף שם לנושא. לחיצה על 'הוסף' תוסיף את הנושא אל טבלת ניהול הנושאים שם יתאפשר להוסיף תמונות. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

                /> */}
                

            </div>

        )
    }
}


export default ManageTopic

