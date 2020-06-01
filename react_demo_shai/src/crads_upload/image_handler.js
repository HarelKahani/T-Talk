import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios'
import {storage} from '../pages/HomePage'
import { database } from 'firebase';
import {ListOfTopicImg} from './list_topic'
import TableHandler from './table_handler'

export class ImgHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            image: null,
            url:'',
            progress: 0,
            imgName: '',
            topicName: this.props.topicName
        };
        // this.imgSelectHandler = this.imgSelectHandler.bind(this);
        // this.imgUploadHAndler = this.imgSelectHandler.bind(this);
    }
    getName = event =>{
        let name = event.target.value
        console.log(name)
        storage.ref(this.state.topicName).listAll()
        .then((event)=> {
            console.log(event)
            console.log(event.items)
            return event.items
        });
        // console.log(item)
        let fileName = `${name}.JPG`
        this.setState({
            imgName: fileName 
        });
    }

    imgSelectHandler = evt => {
        console.log(evt)
        // if(evt.target.files[0]){
        //     const image = evt.target.files[0];
        //     this.setState(()=> ({image}));
        //     console.log(image)
        // }
        let file = evt.target.files[0]
        console.log(file)
        this.setState(prevState => ({
            image: file
        }));
        
        console.log(this.state)
    }

    imgUploadHAndler = () => {
        const {image} = this.state;
        if(image == null){
            console.log("No image was uploaded");
            alert("לא נבחרה תמונה");
            return;
        }

        const uploadTask = storage.ref(`${this.state.topicName}/${this.state.imgName}`).put(image);
        uploadTask.on('state_changed',
        (snapshot) => {
            console.log("in progress")
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress});
            console.log(progress)
        },
        (error) =>{
            console.log("error")
            console.log(error);
        },
        () => {
            storage.ref(`${this.state.topicName}`).child(`${this.state.imgName}`).getDownloadURL()
            .then(url => {
                console.log("ok")
                console.log(url);
                this.setState({url});
            })
        });
    }

    render() {
        return (
            <div>
                <ListOfTopicImg/>
                <input
                type="file"
                style={{display: 'none'}}
                value={this.state.inputValue}
                ref={fileInput=> this.fileInput = fileInput}
                onChange={evt => this.imgSelectHandler(evt)}/>
                <Button onClick={() => this.fileInput.click()}>בחר תמונה</Button>
                <input 
                placeholder="רשום את שם התמונה כאן" 
                type="text"
                style = {{margin: '10px', width: '250px'}} 
                onChange={this.getName}/>
                <Button onClick={this.imgUploadHAndler}>הוסף</Button> 
                <img src={this.state.url} alt="Uploaded image" width='200' height='150'/>
            </div>
        );
    }
}