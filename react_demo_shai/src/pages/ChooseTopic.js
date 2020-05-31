import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';


class ChooseTopic extends Component {

    render() {
        return (


            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th >#</th>
                        <th>שם הנושא</th>
                        <th>בחר נושא</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td > הגייה של האות צ</td>
                        <td> <Button variant="outline-primary"style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>הגייה של האות ש</td>
                        <td> <Button variant="outline-primary" style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td > הגייה של האות צ</td>
                        <td> <Button variant="outline-primary" style={{ width: "20%"}}>בחר</Button></td>
                    </tr>
                </tbody>

            </Table>



        )
    }
}
export default ChooseTopic

