const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); 
const timerDisplay = document.querySelector('#timer');
let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";
let isMoleVisible = false; // Flag to track whether a mole is currently visible

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === 'easy') {
      return 1500; // 1500 milliseconds (1.5 seconds)
  } else if (difficulty === 'normal') {
      return 1000; // 1000 milliseconds (1 second)
  } else if (difficulty === 'hard') {
      // Return a random integer between 600 and 1200 milliseconds
      return Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
  } 
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {
  // Step 1: Generate a random integer from 0 to 8
  const index = Math.floor(Math.random() * holes.length);
  // Step 2: Get a random hole with the random index
  const hole = holes[index];
  // Step 3: Check if hole is the same as the lastHole
  if (hole === lastHole) {
    // Step 4: If hole is the same, call chooseHole(holes) again
    return chooseHole(holes);
  } else {
    // Step 4: If hole is not the same, keep track of it and return the hole
    lastHole = hole;
    return hole;
  }
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/

function gameOver(time) {
  if (time > 0) {
    // If time is greater than 0, continue the game
    if (!isMoleVisible) {
      return showUp();
    }
  } else {
    // If time is 0 or less, stop the game
    const gameStopped = stopGame();
    return gameStopped;
  }
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  // Use setDelay() to get the delay value based on difficulty
  const difficulty = 'easy'; // You can set the difficulty level (easy, normal, hard)
  const delay = setDelay(difficulty);
  // Use chooseHole() to get a random hole
  const holesArray = ['hole0', 'hole1', 'hole2', 'hole3', 'hole4', 'hole5', 'hole6', 'hole7', 'hole8'];
  const hole = chooseHole(holesArray);
  console.log(hole);
  // Call showAndHide() with the obtained delay and hole
  showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay) {
  // Set the flag to indicate that a mole is currently visible
  isMoleVisible = true;

  // Call the toggleVisibility() function to add the show class
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    // Call the toggleVisibility() function to remove the show class when the timer times out
    toggleVisibility(hole);
    // Reset the flag when the mole is hidden
    isMoleVisible = false;
  }, delay); // Change the setTimeout() delay to the one provided as a parameter

  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole) {
  let holeNum = document.querySelector(`#${hole}`);
  // Add hole.classList.toggle() to add or remove the "show" class
  //holeNum.classList.toggle('show');
  if (holeNum.classList.contains('show')){
    holeNum.classList.remove('show')
  }
  else {
    holeNum.classList.add('show')
  };
  
  // Return the updated hole
  return holeNum;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // Increment the points global variable by 1 point
  points++;
  // Update score.textContent with points
  const score = document.querySelector('#score'); 
  score.textContent = points;
  // Return points
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // Set the points global variable to 0
  points = 0;
  // Update score.textContent with the new value (0 in this case)
  const score = document.querySelector('#score');
  score.textContent = points;
  // Return points
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    // If the timer reaches 0, stop the game
    stopGame();
    return;
  }

  // Show moles only if the timer is still running
  if (!isMoleVisible) {
    showUp();
  }
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // Call updateScore() to increment the score
  updateScore();
  // Return points
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });

  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame() {
  clearScore();
  startTimer();
  setEventListeners();
  setDuration(30);
  showUp();
  return "game started";
}
startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
