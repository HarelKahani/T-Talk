import React, { Component } from 'react';




function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




export class Cube extends Component {
  constructor(props) {
      super(props);
      this.rollDice = this.rollDice.bind(this);
    }
     
    rollDice() {
      const dice = [...document.querySelectorAll(".die-list")];
      dice.forEach(die => {
        toggleClasses(die);
        if (this.props.ccolor === -1) {
          die.dataset.roll = getRandomNumber(1, 6);
          this.props.color(die.dataset.roll);
        } else {
          die.dataset.roll = this.props.ccolor;
        }
        console.log(die.dataset.roll)
      });
    }
  render() {
    console.log("redid cube", this.props.ccolor)
    if (this.props.ccolor != -1) {
      this.rollDice()
    }
    return (
      
        <div className="dice" onClick={this.rollDice}>
          <ol className="die-list even-roll" data-roll="1" id="die-1">
            <li className="die-item" data-side="1"></li>
            <li className="die-item" data-side="2"></li>
            <li className="die-item" data-side="3"></li>
            <li className="die-item" data-side="4"></li>
            <li className="die-item" data-side="5"></li>
            <li className="die-item" data-side="6"></li>
          </ol>
          <h6 style={{ textAlign: "center" , backgroundColor:"white"}}><b>לחץ על הקובייה</b></h6>
        </div>
      
    );
  }
} 