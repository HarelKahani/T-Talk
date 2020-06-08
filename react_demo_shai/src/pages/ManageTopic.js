import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { AddSubjectModal } from './AddSubjectModal'
import { TopicsButtons } from './topics_btns'
import {storage} from '../pages/HomePage'



class ManageTopic extends Component {
    constructor(props) {
        super(props);
        this.getSubjectName = this.getSubjectName.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.getAllSubjectNames = this.getAllSubjectNames.bind(this);
        this.state = {  
            SubjectNameval: "" ,
            SubjectName: [], 
            addModalShowForSubjUpload: false 
        }
        this.getAllSubjectNames();
    }

    getAllSubjectNames = () => {
        console.log("erererererrerer")
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
    
    addSubject = ()=>{
        if(this.state.SubjectNameval===""){
            alert("יש להזין שם")
            return;
        }
        this.setState({SubjectName: this.state.SubjectName.concat(this.state.SubjectNameval)})
        console.log(this.state)
    }

    showRow = (i) => {                       
        let topics = this.state.SubjectName
        return topics.map((item, index)=>{
            return <tr>
                <td>{index+1}</td>
                <td > {item} </td>
                <td>
                    <TopicsButtons topicName={item}/>
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
        // this.getAllSubjectNames();
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
                        {this.showRow()}
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
            </div>

        )
    }
}


export default ManageTopic

