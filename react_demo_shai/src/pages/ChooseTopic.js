import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import {storage} from '../pages/HomePage'


class ChooseTopic extends Component {
    constructor(props) {
        super(props);
        this.getSubjectName = this.getSubjectName.bind(this);
        this.getAllSubjectNames = this.getAllSubjectNames.bind(this);
        this.state = {  
            SubjectNameval: "" ,
            SubjectName: [], 
            addModalShowForSubjUpload: false 
        }
        this.getAllSubjectNames();
    }

    getAllSubjectNames = () => {
        let topics = storage.ref('topics/')
        console.log(topics)
        return topics.listAll().then(event =>{
            let list = event.prefixes
            console.log(list);
            list.map((item, index) => {
                this.setState({
                    SubjectName: this.state.SubjectName.concat(item.name)
                })
            })
        }).catch(err => {
            console.log(err)
        });  
    }

    getSubjectName = event => {
        this.setState({ SubjectNameval: event.target.value });
    };
    
    showRow = (i) => {                       
        let topics = this.state.SubjectName
        return topics.map((item, index)=>{
            return <tr>
                <td>{index+1}</td>
                <td > {item} </td>
                <td> 
                    <Button
                    // onclick={} 
                    variant="outline-primary" 
                    style={{ width: "20%"}}>
                        התחל משחק
                    </Button>
                </td>
            </tr>
        })
    }

    showAllRows = () => {
        let all = new Object;
        console.log("here")
        for (let i=0; i<this.state.SubjectName.length; i++){
            all.insert(this.showRow(i))
        }
        return all
    }
    

    render() {
        return (
            <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th >#</th>
                        <th>שם הנושא</th>
                        <th>בחר נושא</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showRow()}
                </tbody>
            </Table>
        </div>
        )
    }
}
export default ChooseTopic

