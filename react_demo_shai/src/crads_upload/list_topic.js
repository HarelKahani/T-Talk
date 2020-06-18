import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {storage} from '../pages/HomePage'
import TableHandler from './table_handler';

export class ListOfTopicImg extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: null,
            arr: [],
            topicName: this.props.topicname
        }
        // this.getList = this.getList.bind(this)
    }
    
    getList = () => {
        var to_del = storage.ref(`topics/${this.state.topicName}/init.txt`);
        console.log(to_del);
        if(to_del !== undefined){
            to_del.delete().then(() =>{
                console.log("deleted init.txt");
            }).catch((err) => {
                console.log("Error!")
                console.log(err)
            })
        }

        return storage.ref(`topics/${this.state.topicName}`).listAll()
        .then((event)=> {
            console.log(event.items)
            if(event.items.length<1){
                console.log("no items in this topic - deleting")
                this.setState({
                    arr:[{
                        url:'',
                        name:'',
                        index:''
                    }]
                })
                return;
            }
            this.setState({list: event.items})
            console.log("here")
            let arr = []
            console.log(this.state.list[0].name)
            for(let j=0; j< this.state.list.length; j++){
                let obj = {}
                this.state.list[j].getDownloadURL()
                .then( url => {
                    obj.url = url;
                }).then(() =>{
                    obj.name = this.state.list[j].name.replace(".JPG", "").replace(".jpg", "").replace(".png", "")
                    obj.index = `${j+1}`
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
            <div >
                <Button style={{margin:"auto", display: "flex"}} onClick={this.getList}>הצג תמונות מהנושא <b>{this.state.topicName}</b></Button>
                <TableHandler topicname={this.state.topicName} data={this.state.arr} list={this.getList}/>
            </div>
        )
    }
}