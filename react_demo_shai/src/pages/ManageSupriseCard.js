import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';


class ChooseTopic extends Component {

    render() {
        return (


            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th >#</th>
                        <th> שם הכרטיס </th>
                        <th> צבע על לוח המשחק </th>
                        <th> מיקום על לוח המשחק </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td > קוף מקלף בננה </td>
                        <td> <Button variant="outline-primary"style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td></td>
                        <td> <Button variant="outline-primary" style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td ></td>
                        <td> <Button variant="outline-primary" style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                </tbody>

            </Table>



        )
    }
}
export default ChooseTopic

