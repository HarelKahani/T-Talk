import React from 'react';
import { Button, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import { CardsPack } from './CardsPack'
import { Cube } from './3dCube'
import { myFirestore } from './../pages/HomePage'
import { storage } from '../pages/HomePage'
// import { Path } from './Path'
import LetItRain from './confetti'

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

let SurpriseOrder = {
    6: "button29",
    5: "button24",
    4: "button17",
    3: "button12",
    2: "button7",
    1: "button3"
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        //console.log("props:", props)
        //this.getSubjectName = this.getSubjectName.bind(this);
        //this.addSubject = this.addSubject.bind(this);
        this.setColor = this.setColor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fillSurprise = this.fillSurprise.bind(this);
        this.findClosestSquare = this.findClosestSquare.bind(this);
        this.setCont = this.setCont.bind(this);
        this.releaseCube = this.releaseCube.bind(this)
        this.state = {
            gameData: this.props.location.gamedata,
            user: this.props.location.user,
            color: -1,
            currentSquare: "button1",
            childSquare: "button1",
            therapistSquare: "button1",
            currentCard: -1,
            currentSuprise: -1,
            surprises: null,
            desiredId: null,
            showConf: false,
            childTurn: true,
            cubeable: this.props.location.user ? true:false,
            surpriseable: true,
            taskable: true,
            allowcont: false,
            surpriseorder: 1,
            enabled: true,
            isturn: false
        };
        this.getSurpriseImages()

        let query = myFirestore.collection('Games')
        let observer = query
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    console.log(change.doc.data().email, this.state.gameData.email)
                    if (change.doc.data().email === this.state.gameData.email) {
                        if (change.type === 'added') {
                        //  console.log('New: ', change.doc.data());
                        }
                        if (change.type === 'modified') {
                            //console.log('Modified: ', change.doc.data());
                            if (change.doc.data().cube != this.state.color) {
                                //console.log(`this is change.doc.cube ${change.doc.data().cube}`)
                                this.setState({ color: change.doc.data().cube })
                                // console.log(`this is state color ${this.state.color}`);
                                if (this.state.color !== -1) {
                                    // let desiredId = this.findClosestSquare();
                                    
                                    // this.disableNotRelevantSquares(desiredId);
                                }
                                //console.log(`this is change.doc.cube ${change.doc.data().cube}`)
                            }
                            if (change.doc.data().childSquare != this.state.childSquare && this.state.user) {
                                this.moveOtherPawn(change.doc.data().childSquare, "Child")
                                this.state.childSquare = change.doc.data().childSquare
                            }
                            if (change.doc.data().therapistSquare != this.state.therapistSquare && !this.state.user) {
                                
                                this.moveOtherPawn(change.doc.data().therapistSquare, "Therapist")
                                this.state.therapistSquare = change.doc.data().therapistSquare
                                
                            }
                            if (change.doc.data().allowcont != this.state.allowcont && !this.state.user) {
                                this.setState({allowcont: change.doc.data().allowcont})
                            }
                            if (change.doc.data().surpriseable != this.state.surpriseable) {
                                this.setState({surpriseable: change.doc.data().surpriseable})
                            }
                            if (change.doc.data().taskable != this.state.taskable) {
                                this.setState({taskable: change.doc.data().taskable})
                            }
                            if (change.doc.data().enabled !== this.state.enabled && !this.state.user) {
                                console.log(change.doc.data().enabled)
                                if (change.doc.data().enabled === 'true') {
                                    this.enableDisable('enable')
                                    this.setState({'enabled': true})
                                } else {
                                    this.enableDisable('disable')
                                    this.setState({'enabled': false})
                                }
                            }
                        }
                        if (change.type === 'removed') {
                        //  console.log('Removed: ', change.doc.data());
                        }
                    }
                });
            });
    }

    disableNotRelevantSquares = (desiredId) => {
        //console.log('this is desiredId', desiredId);
        
        for (let i = 1; i < 31; i++) {
            let square = document.getElementById(`button${i}`);
            // console.log('this is square/////////////////////////////', square);
            if (square.getAttribute('id') === desiredId) {
                square.disabled = false;
                continue;
            } else {
                square.disabled = true;
            }
        }
    }

    findClosestSquare = (cubec) => {
        if (cubec == -1 || cubec == 2) {
            //console.log("cubec -1 or red", cubec)
            if (cubec == 2) {
                this.setTaskable(true)
                this.setSurpriseable(false)
                this.setState({desiredId: SurpriseOrder[this.state.surpriseorder]});
                if (this.state.surpriseorder > 6) {
                    this.state.surpriseorder = 1
                } else {
                    this.state.surpriseorder += 1;
                }
                return SurpriseOrder[this.state.surpriseorder]
            }
            return;
        }
        let cubeColor = NumbersToColors[Number(cubec)];
        //console.log(`this is cubecolor ${cubeColor}`, cubec);

        let colorClass = document.getElementsByClassName(cubeColor);
        let sameColorButtons = Array.from(colorClass);
        // console.log('this is colorbuttons', sameColorButtons);

    
        let swapped;
        let temp;
        do {
            swapped = false;
            for (let i = 0; i < sameColorButtons.length - 1; i++) {
                if (Number(sameColorButtons[i].getAttribute('id').match(/(\d+)/)[0]) > Number(sameColorButtons[i+1].getAttribute('id').match(/(\d+)/)[0])) {
                    temp = sameColorButtons[i];
                    sameColorButtons[i] = sameColorButtons[i+1];
                    sameColorButtons[i+1] = temp;
                    swapped = true;
                    
                }
                
            }
        } while (swapped);

        // console.log('this is sorted ==============', sameColorButtons);

        
        let desiredSquareId;
        //console.log(sameColorButtons)
        for (let i = 0; i < sameColorButtons.length; i++) {
            let currentSquareIdNumber = Number(this.state.currentSquare.match(/(\d+)/)[0]);
            let sameColorButtonsIdNumber = Number(sameColorButtons[i].getAttribute('id').match(/(\d+)/)[0]);
            if (sameColorButtonsIdNumber > currentSquareIdNumber) {
                desiredSquareId = sameColorButtons[i].getAttribute('id');
                this.setState({desiredId: desiredSquareId});
                //console.log('this is desired square', desiredSquareId);
                return desiredSquareId;
            }
        }
        
    }
    setTaskable = (event) => {
        this.setState({taskable: event})
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ taskable: event })
            .then(() => {
               // console.log("written cards color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };
    setSurpriseable = (event) => {
        this.setState({surpriseable: event})
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ surpriseable: event })
            .then(() => {
               // console.log("written cards color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };
    releaseCube = (event) => { 
        if (!this.state.isturn) {
            this.setState({cubeable: !event})
        } 
        this.state.isturn = false
    }
    setCont = (event) => {
        this.setState({allowcont: event})
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ allowcont: event })
            .then(() => {
               // console.log("written cards color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };

    setColor = (event) => {
        this.setState({cubeable: true})
        this.setState({ color: event });
        this.state.isturn = true
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ cube: event })
            .then(() => {
                //console.log("written cube color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };

    setEnbDisb = (event) => {
        if (event == "true") {
            this.setState({enabled: true})
        } else {
            this.setState({enabled: false})
        }
        myFirestore
            .collection("Games")
            .doc(this.state.gameData.email)
            .update({ enabled: event })
            .then(() => {
                //console.log("written cube color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
    };

    setPawn = (event)=> {
        let to_update = null;
        if (this.state.user) {
            to_update = {therapistSquare: event}
        } else {
            to_update = {childSquare: event}
        }
        myFirestore
        .collection("Games")
        .doc(this.state.gameData.email)
        .update(to_update)
        .then(() => {
            //console.log("written pawn")
        })
        .catch(err => {
            console.log("something went wrong", err)
        })
    };

    handleClick = (id, color) => {
        if (id !== this.state.desiredId) {
            //console.log('wrong id');
            return;
        }
        this.setTaskable(false)
        this.setSurpriseable(true)
        this.setPawn(id)
        let prevSquare = () => {
            //console.log("moveinner", this.state.therapistSquare, this.state.childSquare)
                if (this.state.user && this.state.currentSquare === this.state.childSquare) {
                    return `<img class='pawn' src='Pawn2.png' width=30%  id=${this.state.currentSquare}></img>`
                } else if (!this.state.user && this.state.currentSquare === this.state.therapistSquare) {
                    return `<img class='pawn' src='Pawn.png' width=30%  id=${this.state.currentSquare}></img>`
                } else {
                    return ``
                }
        }
        // console.log(`this is id ${id}`);
        // console.log(`this is color ${color}`);

        // console.log(`this is current ${this.state.currentSquare}`)

        if (this.state.currentSquare === id) {
            //console.log('have the same id');
            return;
        }
        document.getElementById(`${this.state.currentSquare}`).innerHTML = prevSquare();

        let nextSquare = document.getElementById(`${id}`);
        let next_pawn_img = () => {
            if (nextSquare.innerHTML.includes("<img")) {
                return "Pawns.png"
            }
            else if (this.state.user) {
                return "Pawn.png"
            }
            else {
                return "Pawn2.png"
            }

        }
        // console.log(`currentSquare ${this.state.currentSquare}`);
        this.setState({ currentSquare: id }, () => {
            // console.log(`second currentSquare ${this.state.currentSquare}`);
            let curr = nextSquare.innerHTML;
            nextSquare.innerHTML = `<img class='pawn' src=${next_pawn_img()} width=30% color=${color} id=${id}></img>`;
        });

        if (id === "button30") {
            this.setState({showConf : true});
        }
    }


    moveOtherPawn = (id, toChange) => {
        let nextSquare = document.getElementById(`${id}`);
        let next_pawn_img = () => {
            if (nextSquare.innerHTML.includes("<img")) {
                return "Pawns.png"
            }
            else if (this.state.user) {
                return "Pawn2.png"
            }
            else {
                return "Pawn.png"
            }
        }
        let prevSquare = () => {
            //console.log("moveother", this.state.therapistSquare, this.state.childSquare)
                if (this.state.user && this.state.currentSquare === this.state.childSquare) {
                    return `<img class='pawn' src='Pawn.png' width=30%  id=${this.state.childSquare}></img>`
                } else if (!this.state.user && this.state.currentSquare === this.state.therapistSquare) {
                    return `<img class='pawn' src='Pawn2.png' width=30%  id=${this.state.therapistSquare}></img>`
                } else {
                    return ``
                }
        }
        if (toChange == "Therapist") {
            document.getElementById(`${this.state.therapistSquare}`).innerHTML = prevSquare();
            let curr = nextSquare.innerHTML;
            this.setState({therapistSquare: id}, () => {
                nextSquare.innerHTML = `<img class='pawn' src=${next_pawn_img()} width=30%  id=${id}></img>`;
            });
        } else if (toChange == "Child") {
            document.getElementById(`${this.state.childSquare}`).innerHTML = prevSquare();
            let curr = nextSquare.innerHTML;
            this.setState({childSquare: id}, () => {
                nextSquare.innerHTML = `<img class='pawn' src=${next_pawn_img()} width=30% id=${id}></img>`;
            });
        }

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
        // console.log(buttonArray);
        if (id === `enable`) {
            //console.log(`enable was pressed`);
            buttonArray.map((button) => {
                button.disabled = false;
            });
        }
        if (id === `disable`) {
            //console.log(`disable was pressed`);
            buttonArray.map((button) => {
                button.disabled = true;
            });
        }
    }

    fillSurprise = () => {
        const classes = document.getElementsByClassName("suprise_pic")
        const ids = Array.from(classes)
        let surprises =[]
        if(this.state.surprises !== null){
            surprises = this.state.surprises.slice().sort((a,b)=>a.index-b.index)
        }
        ids.map((item, index)=>{
            if(this.state.surprises !== null && this.state.surprises[index] !== undefined){
                const pic = surprises[index].url
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
                       // console.log(arr)
                    }).catch(err => {
                        console.log(err)
                    })
            });
        })
    }

    render() {
        //console.log("DIS CUBE", this.state.cubeable)
        this.fillSurprise()
        //console.log(this.state.color);
        //console.log(this.props.location.gamedata);
        const letItRain = this.state.showConf;
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
                <div className="cards_container" style={this.state.taskable || !this.state.enabled ? {pointerEvents: "none", opacity: "0.8"} : {}}>
                    <CardsPack kind={"task"}
                        img={"/cards_imgs/suprise.jpeg"}
                        title={"משימה"}
                        describe={"האם תצליחו להשלים את המשימה?"}
                        gamedata={this.props.location.gamedata}
                        user={this.props.location.user} 
                        setcont={this.setCont}
                        allowcont={this.state.allowcont}
                        settaskable={this.setTaskable}
                        setsurpriseable={this.setSurpriseable}
                        releasecube={this.releaseCube}
                        //key={this.state.allowcont}
                       />
                </div>
                <div className="sup_cards_container" style={this.state.surpriseable || !this.state.enabled ? {pointerEvents: "none", opacity: "0.8" } : {}}>
                    <CardsPack kind={"surprise"}
                        img={"/cards_imgs/main.png"}
                        title={"קלף הפתעה"}
                        describe={"הפתעה! בואו נגלה ביחד אם נאהב את ההפתעה או שלא..."}
                        gamedata={this.props.location.gamedata}
                        user={this.props.location.user}
                        setcont={this.setCont}
                        allowcont={this.state.allowcont}
                        settaskable={this.setTaskable}
                        setsurpriseable={this.setSurpriseable}
                        releasecube={this.releaseCube}
                        //key={this.state.allowcont}
                    />

                </div>
                <div className="cube_container" style={this.state.isturn || this.state.cubeable || !this.state.enabled ? {pointerEvents: "none", opacity: "0.8"} : {}}>
                    <Cube id={"cube"} setColor={this.setColor} color={this.state.color} findClosestSquare={this.findClosestSquare} desiredId={this.state.desiredId}/>
                </div>
                {/* <Path gameData={this.state.gameData} user={this.state.user} surprises={this.state.surprises} /> */}
                <div id="path_container">
                    <div id="buttons">
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button value={'pink'} className="pink" id="button30" style={{ background: "#FF31EA", background: "-moz-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", background: "-webkit-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)",background: "radial-gradient(ellipse at center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", borderRadius: "0px 20px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'orange'} className="suprise_pic orange" id="button29" style={{background:"#CB7A08"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'blue'} className="blue" id="button28" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'green'} className="green" id="button27" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'yellow'} className="yellow" id="button26" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'pink'} className="pink" id="button25" style={{background: "#FF31EA", background: "-moz-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", background: "-webkit-radial-gradient(center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)",background: "radial-gradient(ellipse at center, #FF31EA 0%, #E0ADD8 99%, #FF06AD 100%)", borderRadius: "20px 0px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
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
                        <Button value={'orange'} className="suprise_pic orange" id="button24" style={{background:"#CB7A08"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button value={'blue'} className="blue" id="button13" style={{ background: "#2222FF", background: "-moz-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "-webkit-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "radial-gradient(ellipse at center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", borderRadius: "0px 20px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'orange'} className="orange" id="button14" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'pink'} className="pink" id="button15" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'yellow'} className="yellow" id="button16" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'green'} className="suprise_pic green" id="button17" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'blue'} className="blue" id="button18" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'orange'} className="orange" id="button19" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'pink'} className="pink" id="button20" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'yellow'} className="yellow" id="button21" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'green'} className="green" id="button22" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'blue'} className="blue" id="button23" style={{ background: "#2222FF", background: "-moz-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "-webkit-radial-gradient(center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", background: "radial-gradient(ellipse at center, #2222FF 0%, #2F4054 100%, #2CABFF 100%)", borderRadius: "0px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button value={'green'} className="suprise_pic green" id="button12" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
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
                        <Button value={'yellow'} className="yellow" id="button11" style={{ background: "#EEFF08", background: "-moz-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "-webkit-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "radial-gradient(ellipse at center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", borderRadius: "0px 0px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'pink'} className="pink" id="button10" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'orange'} className="orange" id="button9" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'blue'} className="blue" id="button8" style={blue_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'green'} className="suprise_pic green" id="button7" style={{background:"#00A513"}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'yellow'} className="yellow" id="button6" style={yellow_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'pink'} className="pink" id="button5" style={pink_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'orange'} className="orange" id="button4" style={orange_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'blue'} className="suprise_pic blue" id="button3" style={{background:"#00008B" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button value={'green'} className="green" id="button2" style={green_style} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}>
                            {/* <Image src='Pawn.png' style={{width: '30%', visibility: 'visible'}} ></Image> */}
                        </Button>
                        <Button className="yellow" id="button1" style={{ background: "#EEFF08", background: "-moz-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "-webkit-radial-gradient(center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)", background: "radial-gradient(ellipse at center, #EEFF08 0%, #E0C60A 99%, #FFE60B 100%)" , borderRadius: "20px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} >
                            
                            {/* button1 */}
                            { <img src='Pawns.png' style={{width: '30%', visibility: 'visible'}} ></img> }
                        </Button>
                        <div id="enbale-disable" style={!this.state.user ? {pointerEvents: "none", opacity: "0" } : {}}>
                            <OverlayTrigger
                                    trigger="hover"
                                    key="top"
                                    placement="right"
                                    overlay={
                                        <Popover id={`popover-positioned-${this.placement}`}>
                                            <Popover.Content>
                                                לחיצה על כפתור זה תנעל את כפתורי המשחק (לשני השחקנים) 
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                <Button id="disable" onClick={e => (this.enableDisable(e.target.id), this.setEnbDisb("false"))} style={{margin:"2%", backgroundColor: "#595959", border: 'none'}}>
                                 נעילת לוח 🔒 
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                    trigger="hover"
                                    key="top"
                                    placement="left"
                                    overlay={
                                        <Popover id={`popover-positioned-${this.placement}`}>
                                            <Popover.Content>
                                                לחיצה על כפתור זה תשחרר את כפתורי המשחק (לשני השחקנים) 
                                            </Popover.Content>
                                        </Popover>
                                    }>
                                <Button id="enable" onClick={e => (this.enableDisable(e.target.id), this.setEnbDisb("true"))} style={{backgroundColor: "#595959", border: 'none'}}>
                                שחרור לוח 🔓 
                                </Button>  
                            </OverlayTrigger>

                    </div>
                    </div>
                    
                </div>
                <div id="confettis">{letItRain && <LetItRain />}</div>
            </div>
        )
    }
}


export default Board