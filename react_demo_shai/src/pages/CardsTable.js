import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {ListOfTopicImg} from '../crads_upload/list_topic'

export class CardsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicName: this.props.topicName
        };
    }

   
    render() {      
        return (
            <div>
                 <p>{this.state.topicName}</p>
            <Table striped bordered hover>
                <ListOfTopicImg topicname={this.state.topicName}/>
            </Table>
            </div>
        )
    }
}



