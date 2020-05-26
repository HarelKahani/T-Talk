function rollDice() {
  const die = document.querySelector(".odd-roll")
  die.dataset.roll = getRandomNumber(1,6)



  // const dice = [...document.querySelectorAll(".odd-roll")];
  // dice.forEach(die => {
  //   // toggleClasses(die);
  //   die.dataset.roll = getRandomNumber(1, 6);
  // });
};

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
