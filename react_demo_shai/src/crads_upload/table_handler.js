import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
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

    getKeys = function(){
        // console.log("here2")
        // console.log(this.props.data);
        return ["name"];
    }
    
    getHeader = function(){
        let keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })   
    }
    
    getRowsData = function(){
        let items = this.props.data;
        let keys = this.getKeys();
        return items.map((row, index)=>{
            console.log(row.name)
            console.log(row.image)
            // console.log(index)
            return <tr key={index}><img src={row.image} height="200" width="150"/><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }
    
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        );
    }
}
    const RenderRow = (props) =>{
        console.log(props.keys)
        return props.keys.map((key, index)=>{
            return <td key={props.data[key]}>{props.data[key]}</td>
            })
    }
