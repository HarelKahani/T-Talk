import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios'
import {storage} from '../pages/HomePage'
import { database } from 'firebase';
import TableHandler from './table_handler';

export class ListOfTopicImg extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: null,
            arr: []
        }
        // this.getList = this.getList.bind(this)
    }
    
    getList = () => {
       return storage.ref("My_topic_name").listAll()
        .then((event)=> {
            console.log(event.items)
            this.setState({list: event.items})
            console.log("here")
            let arr = []
            console.log(this.state.list[0].name)
            for(let j=0; j< this.state.list.length; j++){
                let obj = {}
                this.state.list[j].getDownloadURL()
                .then( url => {
                    obj.image = url;
                }).then(() =>{
                    obj.name = this.state.list[j].name
                    arr.push(obj)
                    this.setState({arr: arr})
                    console.log(arr)
                });  
            }
            console.log(arr)
        });
    }
    render(){
        return (
            <div>
                <Button  onClick={this.getList}>click for list</Button>
                <TableHandler data={this.state.arr}/>
            </div>
        )
    }
}