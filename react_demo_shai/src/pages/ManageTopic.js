import React, { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { AddCardsModal } from './AddCardsModal'
import { ExistingCardModal } from './ExistingCardModal'
import { DeleteDialog } from './DeleteDialog'
import { Upload } from './../crads_upload/img_upload'



class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.state = { cards: [], addModalShowForUpload: false, addModalShowForExisting: false, addModalShowForSubjUpload: false }
    }

    render() {
        let addModalCloseUpload = () => this.setState({ addModalShowForUpload: false });
        let addModalCloseExisting = () => this.setState({ addModalShowForExisting: false });
        let addModalCloseDelete = () => this.setState({ addModalShowForDelete: false });
        let addModalCloseSubjecUp = () => this.setState({ addModalShowForSubjUpload: false })
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
                            <td > הגייה של האות צ</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe = {"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}
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
                            {/* <td>
                            {/* <ButtonToolbar> */}
                            {/* <Upload/> */}
                            {/* </ButtonToolbar> */}
                            {/* </td> */}
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>הגייה של האות ש</td>
                            <td>

                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe = {"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

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
                            <td > הגייה של האות צ</td>
                            <td>
                                <ButtonToolbar>
                                    <Button variant="outline-primary" id="add_card" onClick={() => this.setState({ addModalShowForUpload: true })} >הוסף תמונה</Button>
                                    <AddCardsModal
                                        show={this.state.addModalShowForUpload}
                                        onHide={addModalCloseUpload}
                                        title={"הוספת תמונה"}
                                        describe = {"להוספת תמונה יש ללחוץ על 'בחר תמונה' ,לאחר מכן יש לצרף שם לתמונה. לחיצה על 'הוסף' תוסיף את התמונה אל הנושא הנבחר. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

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
                    </tbody>
                </Table>

                <Button variant="primary" id="add_subj" onClick={() => this.setState({ addModalShowForSubjUpload: true })}>הוסף נושא</Button>
                <AddCardsModal
                    show={this.state.addModalShowForSubjUpload}
                    onHide={addModalCloseSubjecUp}
                    title={"הוספת נושא"}
                    describe = {"להוספת נושא יש לצרף שם לנושא. לחיצה על 'הוסף' תוסיף את הנושא אל טבלת ניהול הנושאים שם יתאפשר להוסיף תמונות. ניתן לחזור על פעולה זו עבור כמות הוספות רצויות."}

                />

            </div>

        )
    }
}


export default ManageTopic

