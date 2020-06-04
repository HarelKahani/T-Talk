import React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { CardsPack } from './CardsPack'

class Board extends React.Component {

    handleClick = (id, color) => {
        console.log(`this is id ${id}`);
        console.log(`this is color ${color}`);
        document.getElementById(`${id}`).innerHTML = `${id}`;
    }


    render() {
        return (
            <div>
                <div class="cards_container">
                    <CardsPack />

                </div>
                <div id="container">
                    <div id="buttons">
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button id="button29" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button28" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button27" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button26" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button25" style={{ backgroundColor: 'cyan' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button id="button24" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button id="button13" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button14" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button15" style={{ backgroundColor: 'cyan' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button16" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button17" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button18" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button19" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button20" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button21" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button22" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button23" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <br />
                        <Button id="button12" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <Button disabled></Button>
                        <br />
                        <Button id="button11" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button10" style={{ backgroundColor: 'cyan' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button9" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button8" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button7" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button6" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button5" style={{ backgroundColor: 'cyan' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button4" style={{ backgroundColor: 'pink' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button3" style={{ backgroundColor: 'blue' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button2" style={{ backgroundColor: 'green' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                        <Button id="button1" style={{ backgroundColor: 'yellow' }} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)}></Button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Board