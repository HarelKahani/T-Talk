import React, {Component} from 'react';
// import './img_upload.css'
import {Button} from 'react-bootstrap';
import axios from 'axios'
 
export class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            selectedFile: null,
            imgName: null,
            uploadState: null,
            topicName: this.props.name
        };
    }

    getName = event =>{
        let name = event.target.value
        //console.log(name)
        let fileName = `${name}.JPG`
        this.setState({
            imgName: fileName 
        });
    }

    imgSelectHandler = evt =>{
        // let vfile = val.target.files[0]
        // console.log(vfile)
        // this.setState({
        //     selectedFile: vfile
        // });

        // event.persist()
        //console.log(evt)
        let file = evt.target.files[0]
        this.setState(prevState => ({
            selectedFile: file
        }));
        //console.log(file)
        console.log(this.state)
    }

    imgUploadHAndler = () => {
        if(this.state.selectedFile == null){
           //console.log("No image was uploaded");
            alert("לא נבחרה תמונה");
            return;
        }
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.imgName);
        //console.log(fd);
        axios.post('https://us-central1-t-talk-game.cloudfunctions.net/uploadFile', fd)
        .then(res =>{
                //console.log(res);
                this.setState({
                uploadState: res.status
                });
            }
        )
    }

    displayDiv = () =>{
        if (this.state.uploadState === 200){
            return "none";
        }
        else{
            return 'inline';
        }
    }

    render() {
        return (
            <div class="upload_pic">
            <div style = {{display: this.displayDiv}}>
                <input
                type="file"
                style={{display: 'none'}}
                value={this.state.inputValue}
                ref={fileInput=> this.fileInput = fileInput}
                onChange={evt => this.imgSelectHandler(evt)}/>
                <Button onClick={() => this.fileInput.click()}>בחר תמונה</Button>
                <input 
                placeholder="רשום את השם הרצוי כאן" 
                type="text"
                style = {{margin: '10px', width: '250px'}} 
                onChange={this.getName}/>
                <Button onClick={this.imgUploadHAndler}>הוסף +</Button> 
            </div>
            </div>
        );
    }
}