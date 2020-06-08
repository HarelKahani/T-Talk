import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {storage} from '../pages/HomePage'
import {SurpriseButton} from './surpris_btn'


class ChooseTopic extends Component {
    constructor(props) {
        super(props);
        this.getAllcerdNames = this.getAllcerdNames.bind(this);
        this.state = {  
            cerds: [], 
            list: null,
            addModalShowForUpload: false,
        }
        this.getAllcerdNames();
    }
    addModalCloseUpload = () => {
        this.setState({ addModalShowForUpload: false })
        this.getAllcerdNames()
    }
    getAllcerdNames = () => {
        let surprise = storage.ref('surprise/')
        return surprise.listAll().then(event =>{
            let arr = []
            let list = event.items
            list.map((item, index) => {
                let obj = {}
                item.getDownloadURL()
                .then(url => {
                    obj.url = url;
                }).then(() =>{
                    obj.board = false;
                    obj.name = item.name.replace(".JPG", "").replace(".jpg", "").replace(".png", "");
                    obj.index = index;
                    if (obj.name.startsWith("board")){
                        obj.board = true;
                    }
                    arr.push(obj);
                    this.setState({cerds: arr});  
            }).catch(err => {
                console.log(err)
                })
            });  
        })
    }

    showRow = (i) => {                       
        let surprises = this.state.cerds
        let counter = 0;
        return surprises.map((item, index)=>{
            if(!item.board){
                counter += 1;
                let name = item.name
                return  <tr>
                            <td> {counter} </td>
                            <td style={{fontSize:"200%", textAlign:"center"}}> {item.name} </td>
                            <td> <img src={item.url} alt= "no image yet" height="150px" /> </td>
                            <td> <img src={this.addSmall(surprises, item.name)} alt= "no image yet" height="150px" /> </td>
                            <td>
                                <SurpriseButton cardName={item.name} onHide={this.addModalCloseUpload}/>
                            </td>
                        </tr>
            }
        })
    }
    addSmall = (surprises, name) => {
        let url = "stam"
        surprises.map((item) => {
            if(item.board && item.name.includes(name)){
                url = item.url;
            }
        });
        return url;
    }


    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th >#</th>
                        <th> שם הכרטיס </th>
                        <th> תמונה על הכרטיס </th>
                        <th> תמונה על הלוח </th>
                        <th> החלפת התמונה על הכרטיס </th>
                    </tr>
                </thead>
                <tbody>
                    {this.showRow()}
                </tbody>
            </Table>
        )
    }
}
export default ChooseTopic

