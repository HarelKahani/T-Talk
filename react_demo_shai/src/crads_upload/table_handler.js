import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import { storage } from '../pages/HomePage';

export default class TableHandler extends Component{
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.state = {
            topicName: this.props.topicname
        }
    }
    
    delete_photo = (name) => {
        console.log("name is", name);
        if(name === undefined){
            alert("בעיית תקשורת. נא לנסות שוב")
        }
        if(window.confirm(`האם למחוק את ${name} לצמיתות מהמאגר?`)) {
            console.log("approve")
            this.deleteForGood(name);
            this.props.list();
        }
        else{
            alert("התמונה לא נמחקה");
            console.log("deny");
        }
    }

    deleteForGood = (name) => {
        storage.ref(`topics/${this.state.topicName}/${name}.JPG`).delete()
        .then(() =>{
            console.log("delete JPG was a success")
        }).catch((err) => {
            console.log("error")
            console.log(err)
            storage.ref(`topics/${this.state.topicName}/${name}.jpg`).delete()
            .then(()=>{
                console.log("deleted jpg was a success");
            }).catch((err) =>{
                console.log(err)
                storage.ref(`topics/${this.state.topicName}/${name}.png`).delete()
                .then(()=>{
                    console.log("deleted png  was a success");
                }).catch((err) =>{
                    console.log(err)
                });
            });
        });
    }

    getKeys = function(){
        return [ "index", "name", "image" ];
    }
    
    getHeader = function(){
        let keys =["#","שם","תמונה"]
        return keys.map((key, index)=>{
            return <th key={index+30}>{key.toUpperCase()}</th>
        })   
    }
    
    getRowsData = function(){
        let items = this.props.data.slice().sort((a,b)=>a.index-b.index);
        let keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr key={index}>
                        <RenderRow key={index} data={row} keys={keys}/>
                        <td key={index*17+1}><img src={row.url} height="200" width="150"/></td>
                        <Button 
                        variant="danger" 
                        id="delete_card" 
                        name = {row.name}
                        style={{width: "75px"}} 
                        onClick={e => this.delete_photo(e.target.name)}>
                            <b>X</b>
                        </Button>
                    </tr>
        })
    }
    
    render() {
        return (
            <div>
                 <Table striped bordered hover>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
    const RenderRow = (props) =>{
        return props.keys.map((key, index)=>{
            if(key !== "image"){
                return <td key={props.data[key]}>{props.data[key]}</td>
            }
        })
    }
