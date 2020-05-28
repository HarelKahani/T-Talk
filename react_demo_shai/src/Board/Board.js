import React from 'react';
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';


class Board extends React.Component {

    handleClick = (id, color) => {
        console.log(`this is id ${id}`);
        console.log(`this is color ${color}`);
    }

    render () {
        return (
            <div className="flex-container">
                
                <ButtonGroup id="buttons" aria-label="Basic example" >
                    <Button id="button27" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button26" style={{backgroundColor: 'green'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button25" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button24" style={{backgroundColor: 'pink'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button23" style={{backgroundColor: 'cyan'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <br/>
                    <Button id="button22" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <br/>
                    <Button id="button11" style={{backgroundColor: 'cyan'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button12" style={{backgroundColor: 'pink'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button13" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button14" style={{backgroundColor: 'green'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button15" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button16" style={{backgroundColor: 'cyan'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button17" style={{backgroundColor: 'pink'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button18" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button19" style={{backgroundColor: 'green'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button20" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button21" style={{backgroundColor: 'cyan'}}  onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <br/>
                    <Button id="button10" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <br/>
                    <Button id="button9" style={{backgroundColor: 'pink'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button8" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button7" style={{backgroundColor: 'green'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button6" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button5" style={{backgroundColor: 'cyan'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button4" style={{backgroundColor: 'pink'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button3" style={{backgroundColor: 'blue'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button2" style={{backgroundColor: 'green'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button id="button1" style={{backgroundColor: 'yellow'}} onClick={e => this.handleClick(e.target.id, e.target.style.backgroundColor)} variant="secondary">Left</Button>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <Button style={{backgroundColor: 'white', height: '120px', width: '120px', border: 'none'}} disabled/>
                    <br/>
                    
                </ButtonGroup>
            </div>

           
        )
    }
}


export default Board