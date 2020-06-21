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
      this.state = {clicked: false}
    }
     
    rollDice() {
      const dice = [...document.querySelectorAll(".die-list")];
      let bandage = 1
      dice.forEach(die => {
        toggleClasses(die);
        if (this.state.clicked && bandage > 0) {
          //die.dataset.roll = getRandomNumber(1, 6);
          let rnum = getRandomNumber(1, 6);
          do {
             rnum = getRandomNumber(1, 6);
          } while (rnum == die.dataset.roll)
          die.dataset.roll = rnum
          this.props.setColor(die.dataset.roll);
          this.props.findClosestSquare(die.dataset.roll);
          this.state.clicked = false
          bandage--;
        } else if (bandage > 0)  {
          die.dataset.roll = this.props.color;
          bandage--;
        }
        //console.log(die.dataset.roll)
      });
    }
  render() {
    //console.log("redid cube", this.props.color)
    if (this.props.color != -1 && !this.state.clicked) {
      this.rollDice()
    }
    return (
        <div className="dice" onClick={() => { this.state.clicked = true; this.rollDice() }}>
          <ol className="die-list even-roll" data-roll="1" id="die-1">
            <li className="die-item" data-side="1"></li>
            <li className="die-item" data-side="2"></li>
            <li className="die-item" data-side="3"></li>
            <li className="die-item" data-side="4"></li>
            <li className="die-item" data-side="5"></li>
            <li className="die-item" data-side="6"></li>
          </ol>
          <h6 style={{ textAlign: "center" , backgroundColor:"transparent"}}><b>לחץ על הקובייה</b></h6>
        </div>
      
    );
  }
} 