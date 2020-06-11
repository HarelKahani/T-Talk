import React from 'react';
import { Button, ButtonGroup, ToggleButton, Image } from 'react-bootstrap';
import { myFirestore } from './../pages/HomePage'

export class Path extends React.Component {

    constructor(props) {
        super(props);
        console.log("props:", props)
        this.setColor = this.setColor.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.fillSurprise = this.fillSurprise.bind(this);

        this.state = {
            gameData: this.props.gameData,
            user: this.props.user,
            mycolor: 0,
            myccolor: -1,
            currentSquare: "button1",
            surprises: this.props.surprises
        };
    }

    setColor = (event) => {
        myFirestore
            .collection("Games")
            .doc(this.state.gameData)
            .update({ cube: event })
            .then(() => {
                console.log("written cube color")
            })
            .catch(err => {
                console.log("something went wrong", err)
            })
        this.setState({ mycolor: event });
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
            console.log(item.id, item.style.backgroundColor)
            if(this.props.surprises !== null && this.props.surprises[index] !== undefined){
                const pic = this.props.surprises[index].url
                item.style = `background-image: url(${pic}); background-size: 85% 85%; background-repeat: no-repeat; background-position: 50% 50%; background-color: ${item.style.backgroundColor};`;
                // item.innerHTML = `<img class="sup_img" src=${this.props.surprises[index].url} width=100% color=${item.style.backgroundColor} id=${item.id}></img>`;
             
            }
        });
    }

    render() {
        this.fillSurprise()
        return (
            <div>

                <div id="path_container">
                    <div id="buttons">
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button disabled style={{ visibility: "hidden" }}></Button>
                        <Button id="button30" style={{ backgroundColor: 'yellow', borderRadius: "0px 20px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic" id="button29" style={{ backgroundColor: 'lightblue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button28" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button27" style={{ backgroundColor: 'rgba(33, 150, 243, 0.75)' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button26" style={{ backgroundColor: 'rgba(233, 30, 99, 0.75)' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button25" style={{ backgroundColor: 'lightblue', borderRadius: "20px 0px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
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
                        <Button className="suprise_pic" id="button24" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button className="suprise_pic" id="button13" style={{ backgroundColor: '#e91e63', borderRadius: "0px 20px 0px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button14" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button15" style={{ backgroundColor: 'lightblue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button16" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic" id="button17" style={{ backgroundColor: '#e91e63' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button18" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button19" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button20" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button21" style={{ backgroundColor: '#e91e63' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button22" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button23" style={{ backgroundColor: 'green', borderRadius: "0px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button id="button12" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
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
                        <Button id="button11" style={{ backgroundColor: 'yellow', borderRadius: "0px 0px 20px 0px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button10" style={{ backgroundColor: 'lightblue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button9" style={{ backgroundColor: '#e91e63' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button8" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic" id="button7" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button6" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button5" style={{ backgroundColor: 'lightblue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button4" style={{ backgroundColor: '#e91e63' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button className="suprise_pic" id="button3" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button2" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}>
                            {/* <Image src='Pawn.png' style={{width: '30%', visibility: 'visible'}} ></Image> */}
                        </Button>
                        <Button id="button1" style={{ backgroundColor: 'yellow' , borderRadius: "20px 0px 0px 20px" }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}>
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
