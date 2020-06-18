import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {storage} from '../pages/HomePage'

export class SurpriseHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            image: null,
            url:'',
            progress: 0,
            imgName: '',
            cardName: this.props.cardName
        };
        console.log(this.state.cardName)
    }
    getName = event =>{
        let name = event.target.value
        console.log(name)
        // console.log(item)
        let fileName = `${name}.JPG`
        this.setState({
            imgName: fileName 
        });
    }

    imgSelectHandler = evt => {
        console.log(evt)
        let file = evt.target.files[0]
        console.log(file)
        this.setState(prevState => ({
                image: file
            })
        );  
        console.log(this.state)
    }

    imgUploadHAndler = () => {
        const {image} = this.state;
        if(image == null){
            console.log("No image was uploaded");
            alert("לא נבחרה תמונה");
            return;
        }
        storage.ref(`surprise/${this.state.cardName}.jpg`).delete()
        .then(() =>{
            console.log("delete was a success")
        }).catch((err) => {
            console.log("error")
            console.log(err)
        })

        const uploadTask = storage.ref(`surprise/${this.state.cardName}.jpg`).put(image);
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
            storage.ref(`surprise/`).child(`${this.state.cardName}.jpg`).getDownloadURL()
            .then(url => {
                console.log("ok")
                console.log(url);
                this.setState({url});
            })
        });
    }

    render() {
        return (
            <div className="img_input" >
                <input
                type="file"
                style={{display: 'none', position:'fixed'}}
                value={this.state.inputValue}
                ref={fileInput=> this.fileInput = fileInput}
                onChange={evt => this.imgSelectHandler(evt)}/>
                <Button 
                    onClick={() => this.fileInput.click()}
                    style={{margin:"10px", margin: "0 auto"}}>
                        בחר תמונה
                </Button>
                <Button 
                    onClick={this.imgUploadHAndler}
                    style={{margin:"10px"}}>
                         החלף תמונה ל <b>{this.state.cardName}</b>
                </Button> 
                <img src={this.state.url} alt="No image addad" width='200' height='150'/>
            </div>
        );
    }
}