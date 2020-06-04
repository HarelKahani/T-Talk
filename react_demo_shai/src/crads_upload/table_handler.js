import React, {Component} from 'react';
import {Button, Table} from 'react-bootstrap';
import axios from 'axios'
import {storage} from '../pages/HomePage'
import { database } from 'firebase';

export default class TableHandler extends Component{
    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }
    
    //TODO: add deletion
    delete_photo = function(){
        alert("למחוק תמונה?");
    }

    getKeys = function(){
        return [ "index", "name", "image" ];
    }
    
    getHeader = function(){
        // let keys = this.getKeys();
        let keys =["#","שם","תמונה"]
        return keys.map((key, index)=>{
            return <th key={index+30}>{key.toUpperCase()}</th>
        })   
    }
    
    getRowsData = function(){
        let items = this.props.data.slice().sort((a,b)=>a.index-b.index);
        let keys = this.getKeys();
        return items.map((row, index)=>{
            console.log(row.name)
            console.log(row.image)
            // console.log(index)
            return <tr key={index}>
                        <RenderRow key={index} data={row} keys={keys}/>
                        <td><img src={row.url} height="200" width="150"/></td>
                        <Button variant="danger" id="delete_card" style={{width: "75px"}} onClick={this.delete_photo}><b>X</b></Button>
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
