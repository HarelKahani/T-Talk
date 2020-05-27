import React, { Component } from 'react';
import { Button, ButtonToolbar, Table } from 'react-bootstrap';
import { ManageCardsModal } from './ManageCardsModal'
import {Upload} from './../crads_upload/img_upload'


class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.state = { cards: [], addModalShow: false }
    }

    render() {
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th >#</th>
                        <th>שם הנושא</th>
                        <th>ניהול נושא</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td > הגייה של האות צ</td>
                        <td>
                            <ButtonToolbar>
                                <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShow: true })} >קלפים קיימים</Button>
                                <ManageCardsModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                />
                            </ButtonToolbar>
                        </td>
                        {/* <td>
                            <Upload />
                        </td> */}
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>הגייה של האות ש</td>
                        <td>

                            <ButtonToolbar>
                                <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShow: true })} >קלפים קיימים</Button>
                                <ManageCardsModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
                                />
                            </ButtonToolbar>

                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td > הגייה של האות צ</td>
                        <td>
                            <ButtonToolbar>
                                <Button variant="outline-primary" id="existing_cards" onClick={() => this.setState({ addModalShow: true })} >קלפים קיימים</Button>
                                <ManageCardsModal
                                    show={this.state.addModalShow}
                                    onHide={addModalClose}
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

