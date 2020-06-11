import React from 'react';
import { Button, ButtonGroup, ToggleButton, Image } from 'react-bootstrap';
import { CardsPack } from './CardsPack'
import { Cube } from './3dCube'
import { myFirestore } from './../pages/HomePage'
import { storage } from '../pages/HomePage'
import { Path } from './Path'


// .onUpdate((snapshot, context) => {
//     const val = snapshot.val();
//     console.log(val)
// });

class Board extends React.Component {

    constructor(props) {
        super(props);
        console.log("props:",props)
        //this.getSubjectName = this.getSubjectName.bind(this);
        //this.addSubject = this.addSubject.bind(this);
        this.setColor = this.setColor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            gameData: this.props.location.gamedata,
            user: this.props.location.user,
            color: 0, 
            ccolor: -1, 
            currentSquare: "button1",
            surprises: null
            };
        this.getSurpriseImages()
        // this.state = { currentSquare: 'button1', squareToTurnOff: 'none' };

        let query = myFirestore.collection('Games')
        let observer = query
        .onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                console.log('New: ', change.doc.data());
            }
            if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data());
                if (change.doc.data().cube != this.state.color) {   
                    console.log(change.doc.data().cube)
                    this.setState({ccolor: change.doc.data().cube})
                }
            }
            if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data());
            }
            });
        });
    }

    setColor = (event)=>{
        myFirestore
        .collection("Games")
        .doc(this.state.gameData.email)
        .update({cube: event})
        .then(() => {
            console.log("written cube color")
        })
        .catch(err => {
            console.log("something went wrong", err)
        })
        this.setState({ color: event });
    };

    handleClick = (id, color) => {
        console.log(`this is id ${id}`);
        console.log(`this is color ${color}`);

        document.getElementById(`${this.state.currentSquare}`).innerHTML = '';
        
        let nextSquare = document.getElementById(`${id}`);
        console.log(`currentSquare ${this.state.currentSquare}`);
        this.setState({currentSquare: id}, () => {
            console.log(`second currentSquare ${this.state.currentSquare}`);
            nextSquare.innerHTML = `${<img src='Pawn.png' style={{width: '30%', visibility: 'visible'}} ></img>}`;
        });
    }

    fillArray = () => {
        let buttonArray = [];
        let idIndex;
        for (idIndex = 1; idIndex < 31; idIndex++) {
            buttonArray[idIndex] = document.getElementById(`button${idIndex}`);
        }
        return buttonArray;
    }

    enableDisable = (id) => {
        let buttonArray = this.fillArray();
        console.log(buttonArray);
        if (id === `enable`) {
            console.log(`enable was pressed`);
            buttonArray.map((button) => {
                button.disabled = false;
            });
        } 
        if (id === `disable`) {
            console.log(`disable was pressed`);
            buttonArray.map((button) => {
                button.disabled = true;
            });
        }
    }

    getSurpriseImages = () => {
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
                    this.setState({surprises: arr});
                    console.log(arr)
            }).catch(err => {
                console.log(err)
                })
            });  
        })
    }

    showPath = () => {
        console.log(this.state)
        return <Path gameData={this.state.gameData} user={this.state.user} surprises={this.state.surprises}/>
    }
    render() {
        console.log(this.state.color);
        console.log(this.props.location.gamedata)
        return (
            <div style={{
                position: "fixed",
                backgroundImage: `url(cards_imgs/BG.jpg)`,
                width: "100%",
                height: "100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
               display: "block"
              }}>
                {/* <Button onClick={this.getSurpriseImages}>התחל משימה ראשונה</Button> */}
                <div className="vl"></div>
                <div className="cards_container">
                    <CardsPack kind = {"task"}
                    title={"משימה"}
                    describe={"האם תצליחו להשלים את המשימה?"}/>

                </div>
                <div className="sup_cards_container">
                    <CardsPack kind = {"suprise"}
                     title={"קלף הפתעה"}
                     describe={"הפתעה! בואו נגלה ביחד אם נאהב את ההפתעה או שלא..."}
                     />

                </div>
                <div className="cube_container">
                    <Cube color={this.setColor} ccolor={this.state.ccolor}/>
                </div>
                <Path gameData={this.state.gameData} user={this.state.user} surprises={this.state.surprises}/>
            </div>
        )
    }
}


export default Board