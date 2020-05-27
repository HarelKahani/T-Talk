import React, {Component} from 'react';
import './img_upload.css'
import axios from 'axios'
 
export class Upload extends Component {
    state = {
        selectedFile: null,
        imgName: null
    };

    getName = event =>{
        //TODO: findout how to get name
        let name = "nnn"
        this.setState({
            imgName: name
        });
    }

    imgSelectHandler = event =>{
        console.log(event)
        this.setState({
            selectedFile: event.targaet.files[0]
        });
        
        // console.log(event.persist() || event);
    }

    imgUploadHAndler = event => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.imgName);
        axios.post('https://us-central1-t-talk-game.cloudfunctions.net/uploadFile', fd)
        .then(res =>
            console.log(res))
    }

    render() {
        return (
            <div id="img-upload">
                <input type="text" onChange={this.getName}/>
                <input
               
                type="file"
                onChange={this.imgUploadHandler}/>
               
                <button onClick={this.imgUploadHAndler}>Upload</button> 
            </div>
        );
    }
}
// style={{display: 'none'}} 
 // ref={fileInput=> this.fileInput = fileInput}/>
                // <button onClick={() => this.fileInput()}>Choose Image</button>