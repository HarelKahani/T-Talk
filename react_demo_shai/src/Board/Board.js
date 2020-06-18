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

let NumbersToColors = {
    1: 'yellow',
    2: 'red',
    3: 'green',
    4: 'pink',
    5: 'blue',
    6: 'orange'
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        console.log("props:", props)
        //this.getSubjectName = this.getSubjectName.bind(this);
        //this.addSubject = this.addSubject.bind(this);
        this.setColor = this.setColor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fillSurprise = this.fillSurprise.bind(this);
        this.state = {
            gameData: this.props.location.gamedata,
            user: this.props.location.user,
            color: -1,
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
                            console.log(`this is change.doc.cube ${change.doc.data().cube}`)
                            this.setState({ color: change.doc.data().cube })
                            this.findClosestSquare(this.state.color);
                            console.log(`this is change.doc.cube ${change.doc.data().cube}`)
                        }
                    }
                    if (change.type === 'removed') {
                        console.log('Removed: ', change.doc.data());
                    }
                });
            });
    }

    addButtonsToArray = (idOfButtonToSkip) => {
        let buttonArray = [];
        let i;
        let currentColor = this.NumbersToColors[this.state.color]
        for (i = 1; i < 31; i++) {
            if (idOfButtonToSkip === this.state.currentSquare) {
                continue;
            }
            else {
                buttonArray[i] = document.getElementById(`button${i}`);
            }
        }
    }

    findClosestSquare = (currentColor) => {
        let buttonArray = [];
        let i;
        for (i = 1; i < 31; i++) {

        }
    }

    setColor = (event) => {
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ cube: event })
            .then(() => {
                this.setState({ color: event });
                console.log("written cube color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };

    handleClick = (id, color) => {
        console.log(`this is id ${id}`);
        console.log(`this is color ${color}`);

        console.log(`this is current ${this.state.currentSquare}`)

        if (this.state.currentSquare === id) {
            console.log('have the same id');
            return;
        }
        document.getElementById(`${this.state.currentSquare}`).innerHTML = '';

        let nextSquare = document.getElementById(`${id}`);
        console.log(`currentSquare ${this.state.currentSquare}`);
        this.setState({ currentSquare: id }, () => {
            console.log(`second currentSquare ${this.state.currentSquare}`);
            let curr = nextSquare.innerHTML;
            nextSquare.innerHTML = `${curr} <img class='pawn' src='Pawn.png' width=30% color=${color} id=${id}></img>`;
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

    fillSurprise = () => {
        const classes = document.getElementsByClassName("suprise_pic")
        const ids = Array.from(classes)
        ids.map((item, index)=>{
            //console.log(item.id, item.style.backgroundColor)
            if(this.state.surprises !== null && this.state.surprises[index] !== undefined){
                const pic = this.state.surprises[index].url
                item.style = `background-image: url(${pic}); background-size: 85% 85%; background-repeat: no-repeat; background-position: 50% 50%; background-color: ${item.style.backgroundColor};`;
                // item.innerHTML = `<img class="sup_img" src=${this.props.surprises[index].url} width=100% color=${item.style.backgroundColor} id=${item.id}></img>`;
             
            }
        });
    }

    getSurpriseImages = () => {
        let surprise = storage.ref('surprise/')
        return surprise.listAll().then(event => {
            let arr = []
            let list = event.items
            list.map((item, index) => {
                let obj = {}
                item.getDownloadURL()
                    .then(url => {
                        obj.url = url;
                    }).then(() => {
                        obj.board = false;
                        obj.name = item.name.replace(".JPG", "").replace(".jpg", "").replace(".png", "");
                        obj.index = index;
                        if (obj.name.startsWith("board")) {
                            obj.board = true;
                        }
                        arr.push(obj);
                        this.setState({ surprises: arr });
                        console.log(arr)
                    }).catch(err => {
                        console.log(err)
                    })
            });
        })
    }

    enable = () => {
        console.log("somthing somthing")
    }

    render() {
        this.fillSurprise()
        console.log(this.state.color);
        console.log(this.props.location.gamedata);
        let yellow_style = {background: "#EEFF08", background: "-moz-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "-webkit-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "radial-gradient(ellipse at center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)"};
        let blue_style = { background: "#2222FF", background: "-moz-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "-webkit-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "radial-gradient(ellipse at center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)" };
        let pink_style = {background: "#FF31EA", background: "-moz-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", background: "-webkit-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)",background: "radial-gradient(ellipse at center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)"}
        let green_style= {  background: "#3AFF12", background: "-moz-radial-gradient(center, #3AFF12 0%, #00A513 100%, #45FF00 100%)", background: "-webkit-radial-gradient(center, #3AFF12 0%, #00A513 100%, #45FF00 100%)", background: "radial-gradient(ellipse at center, #3AFF12 0%, #00A513 100%, #45FF00 100%)"}
        let orange_style={background: "#FFD500", background: "-moz-radial-gradient(center, #FFD500 0%, #CB7A08 100%, #FFB303 100%)", background: "-webkit-radial-gradient(center, #FFD500 0%, #CB7A08 100%, #FFB303 100%)", background: "radial-gradient(ellipse at center, #FFD500 0%, #CB7A08 100%, #FFB303 100%)"}
       
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
                    <CardsPack kind={"task"}
                        img={"/cards_imgs/suprise.jpeg"}
                        title={"משימה"}
                        describe={"האם תצליחו להשלים את המשימה?"}
                        gamedata={this.props.location.gamedata} />
                </div>
                <div className="sup_cards_container">
                    <CardsPack kind={"surprise"}
                        img={"/cards_imgs/main.png"}
                        title={"קלף הפתעה"}
                        describe={"הפתעה! בואו נגלה ביחד אם נאהב את ההפתעה או שלא..."}
                        gamedata={this.props.location.gamedata}
                    />

                </div>
                <div className="cube_container">
                    <Cube setColor={this.setColor} color={this.state.color} />
                </div>
                {/* <Path gameData={this.state.gameData} user={this.state.user} surprises={this.state.surprises} /> */}
                <div id="path_container">
                    <div id="buttons">
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button className="pink" id="button30" style={{ background: "#FF31EA", background: "-moz-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", background: "-webkit-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)",background: "radial-gradient(ellipse at center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", borderRadius: "0px 20px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic orange" id="button29" style={{background:"#CB7A08"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="blue" id="button28" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="green" id="button27" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="yellow" id="button26" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="pink" id="button25" style={{background: "#FF31EA", background: "-moz-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", background: "-webkit-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)",background: "radial-gradient(ellipse at center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", borderRadius: "20px 0px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button className="suprise_pic orange" id="button24" style={{background:"#CB7A08"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button className="blue" id="button13" style={{ background: "#2222FF", background: "-moz-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "-webkit-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "radial-gradient(ellipse at center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", borderRadius: "0px 20px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="orange" id="button14" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="pink" id="button15" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="yellow" id="button16" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic green" id="button17" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="blue" id="button18" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="orange" id="button19" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="pink" id="button20" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="yellow" id="button21" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="green" id="button22" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="blue" id="button23" style={{ background: "#2222FF", background: "-moz-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "-webkit-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "radial-gradient(ellipse at center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", borderRadius: "0px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button className="suprise_pic green" id="button12" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <br />
                        <Button className="yellow" id="button11" style={{ background: "#EEFF08", background: "-moz-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "-webkit-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "radial-gradient(ellipse at center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", borderRadius: "0px 0px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="pink" id="button10" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="orange" id="button9" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="blue" id="button8" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic green" id="button7" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="yellow" id="button6" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="pink" id="button5" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="orange" id="button4" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic blue" id="button3" style={{background:"#00008B" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="green" id="button2" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}>
                            {/* <Image src='Pawn.png' style={{width: '30%', visibility: 'visible'}} ></Image> */}
                        </Button>
                        <Button className="yellow" id="button1" style={{ background: "#EEFF08", background: "-moz-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "-webkit-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "radial-gradient(ellipse at center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)" , borderRadius: "20px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}>
                            {/* button1 */}
                            {/* <img src='Pawn.png' style={{width: '30%', visibility: 'visible'}} ></img> */}
                        </Button>
                        <div id="enbale-disable">
                        <Button id="disable" onClick={e => this.enableDisable(e.target.id)} style={{margin:"2%"}}>
                            הפעל נעילת לוח
                    </Button>
                        <Button id="enable" onClick={e => this.enableDisable(e.target.id)}>
                            שחרר נעילת לוח
                    </Button>
                    </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}


export default Board