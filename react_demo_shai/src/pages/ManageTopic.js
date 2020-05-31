import React, { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { AddCardsModal } from './AddCardsModal'
import { ExistingCardModal } from './ExistingCardModal'
import { DeleteDialog } from './DeleteDialog'
import { Upload } from './../crads_upload/img_upload'



class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.state = { cards: [], addModalShowForUpload: false, addModalShowForExisting: false }
    }

    render() {
        let addModalCloseUpload = () => this.setState({ addModalShowForUpload: false });
        let addModalCloseExisting = () => this.setState({ addModalShowForExisting: false });
        let addModalCloseDelete = () => this.setState({ addModalShowForDelete: false });
        return (
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



        )
    }
}


export default ManageTopic

