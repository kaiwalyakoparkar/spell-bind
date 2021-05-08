'use scrict';
///// GLOBAL ARRAYS /////
var riddleArray = [];
var riddleIndexArray = [];
var randomRiddleIndex = 0;
var widthPic = [368, 348, 338, 318, 288, 268, 248, 218, 188, 168];
var opacityPic = 0.13;

var userArray = [];
var parseLocalStorageArray = [];

var round = 10;
var currentUserScore = 0;
var currentUserIndex = 0;

///// GAME PAGE: CREATE BUTTONS TO ANSWER QUESTIONS /////
var btnOne = document.createElement('button');
var btnTwo = document.createElement('button');
var btnThree = document.createElement('button');
var btnFour = document.createElement('button');
var buttonBox = document.getElementById('button-container');
var nextPage = document.getElementById('nextPage');
var answer = document.getElementById('answer');
var p = document.createElement('p');


///// GAME PAGE: CREATE QUESTION /////
var questionBox = document.getElementById('question');
var container = document.getElementById('container');

///// GAME PAGE: RANDOM FUNC GENERATOR /////
function randomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

///// HIDE FUNC /////
function hide(elem) {
  elem.style.display = 'none';
}

///// SHOW FUNC /////
function show(elem) {
  elem.style.display = 'block';
}

///// LOCAL STORAGE FUNCTIONS /////
///// INDEXPAGE: function LOCALSTORAGE STORE userArray /////
function saveLocalStorageArray() {
  var storeString = JSON.stringify(userArray);
  localStorage.setItem('currentUser', storeString);
}

///// INDEXPAGE: function LOCALSTORAGE RETRIEVE userArray /////
function parseLocalStorage() {
  var retrieveString = localStorage.getItem('currentUser');
  parseLocalStorageArray = JSON.parse(retrieveString);
  console.log('this is the parsed Local Storage Array = ', parseLocalStorageArray);
  return parseLocalStorageArray;
}

///// GAME PAGE: LOCALSTORAGE retrieve user name and score///
function retrieveUserArray() {
  parseLocalStorage();
  if (parseLocalStorageArray.length > 0) {
    currentUserIndex = parseLocalStorageArray.length - 1;
    userArray = parseLocalStorageArray;
    currentUserScore = userArray[currentUserIndex].score;
    console.log('this is our current user', userArray[currentUserIndex].username, 'this is our current user score', currentUserScore);
  }
  else {
    userArray = [];
  }
}

///// RIDDLE CONSTRUCTOR /////

function Riddle(riddle, reply, choiceOne, choiceTwo, choiceThree, choiceFour) {
  this.riddle = riddle;
  this.reply = reply;
  this.choiceOne = choiceOne; ///choice
  this.choiceTwo = choiceTwo; //choices
  this.choiceThree = choiceThree;
  this.choiceFour = choiceFour;
  riddleArray.push(this);
}


function createRiddleArray() {
  new Riddle('You can drop me from the tallest building and I will be fine, but if you drop me in water I die. What am I?', 'Paper', 'Rock', 'Scissor', 'Paper', 'Bat');
  new Riddle('What has a head and a tail, but no body?', 'Coin', 'Snake', 'Coin', 'paper', 'towel');
  new Riddle('What has an eye but can not see?', 'Needle', 'Bat', 'Pen', 'Needle', 'Pirate');
  new Riddle('What gets wetter and wetter the more it dries?', 'Towel', 'Toe', 'Water', 'Face', 'Towel');
  new Riddle('Your height is six feet, you are an assistant at a butcher shop, and you wear size 9 shoes. What do you weigh in pounds?', 'Meat', '192', 'Table', 'Horse', 'Meat');
  new Riddle('There was a green house. Inside the green house there was a white house. Inside the white house there was a red house. Inside the red house there were lots of babies. What is it?', 'watermelon', 'lime', 'watermelon', 'coconut', 'avocado');
  new Riddle('What kind of room has no doors or windows?', 'mushroom', 'escaperoom', 'jail', 'mushroom', 'pumpkin');
  new Riddle('What kind of tree can you carry in your hand?', 'palm', 'broccoli', 'ipad', 'fern', 'palm');
  new Riddle('Which word in the dictionary is spelled incorrectly?', 'incorrectly', 'rumplestilskin', 'hakunamata', 'incorrectly', 'supercalafragilisticespialadocious');
  new Riddle('Which creature walks on four legs first, two legs later, and three legs before it dies?', 'man', 'man', 'dog', 'centepede', 'chair');
  new Riddle('If you have me, you want to share me. If you share me, you have not got me. What am I?', 'secret', 'secret', 'promise', 'food', 'lie');
  new Riddle('What gets broken without being held?', 'promise', 'water', 'hope', 'promise', 'child');
  new Riddle('Feed me and I live, yet give me a drink and I die. What am I?', 'fire', 'wind', 'dog', 'waterdam', 'fire');
  new Riddle('A person is pushing his car outside along the road when he comes to a nearby hotel and shouts, "I am bankrupt!" What is he up to?', 'playing monopoly', 'robbing a bank', 'playing monopoly', 'playing hookie', 'playing hopscotch');
  new Riddle('What do the poor have in plenty, the rich need it, and if you eat it, you will die?', 'nothing', 'air', 'nothing', 'money', 'blankets');
  new Riddle('Who makes it, has no need of it. Who buys it, has no use for it. Who uses it can neither see nor feel it. What is it?', 'coffin', 'air', 'coffin', 'darkness', 'feather');
  new Riddle('What can travel around the world while staying in a corner?', 'stamp', 'stamp', 'baby', 'computeruser', 'oxen');
  new Riddle('I am tall when I am young and I am short when I am old. What am I?', 'candle', 'oldman', 'benjamin button', 'candle', 'panda');
  new Riddle('What has hands but never clap', 'clock', 'clock', 'your mom', 'babies', 'trees');
  new Riddle('Forward I am heavy, but backward I am not. What am I?', 'ton', 'ton', 'gorilla', 'credit card', 'mullet');
  new Riddle('I have married many women, but am a bachelor. Who am I?', 'priest', 'ex-husband', 'priest', 'Hugh Hefner', 'MickeyMouse');
  new Riddle('With my help you can look through walls. What am I?', 'window', 'xray', 'peephole', 'pebble', 'window');
  new Riddle('If you take off my skin, I will make you cry! What am I?', 'onion', 'everyone', 'KFC', 'onion', 'banana');
  new Riddle('What is at the end of a rainbow?', 'letter w', 'letter w', 'gold', 'puddles', 'purple');
  new Riddle('What is as light as a feather, but no one can hold it for more than a minute?', 'breath', 'feather', 'toe nail', 'koala', 'breath');
  new Riddle('Which weighs more, a pound of feathers or a pound of bricks?', 'neither', 'feathers', 'bricks', 'both', 'neither');
  new Riddle('What occurs once in every minute, twice in every moment, yet never in a thousand years?', 'letter m', 'letter m', 'love', 'dogs', 'toilet', 'turkey');
  new Riddle('What has a neck but no head?', 'bottle', 'turtles', 'headless horseman', 'bottle', 'snake');
  new Riddle('Voiceless it cries, wingless flutters, toothless bites, mouthless mutters. What am I?', 'wind', 'wind', 'candleflame', 'fish', 'wings');
  new Riddle('Alive without breath, as cold as death, never thirsty, ever drinking, all in mail never clinking.', 'fish', 'fish', 'turtle', 'octopus', 'otter');
  new Riddle('A box without hinges, key, or lid,yet golden treasure inside is hid. What is it?', 'egg', 'porkchop', 'presents', 'egg', 'lunchbox');
  new Riddle('Tear one off and scratch my head what was red is black instead. What am I?', 'matchstick', 'matchstick', 'cigar', 'lighter', 'fire');
  new Riddle('What is always on its way but never arrives?', 'tomorrow', 'present', 'tomorrow', 'my date', 'uber');
  new Riddle('What kills by drowning but is never wet?', 'quicksand', 'quicksand', 'tornado', 'dryer', 'washingmachine');
  new Riddle('What goes up but never comes down?', 'age', 'tomorrow', 'satellite', 'age', 'ego');
}

//// generate random riddles/////
function uniqueRandomNumber() {
  randomRiddleIndex = randomIndex(riddleArray.length);
  while (riddleIndexArray.includes(randomRiddleIndex)) {
    randomRiddleIndex = randomIndex(riddleArray.length);
  }
  riddleIndexArray.push(randomRiddleIndex);
  console.log('this is the randomRiddleIndex', randomRiddleIndex);
  return randomRiddleIndex;
}

// ///// GAME PAGE: APPEND QUESTIONS TO DOM /////
function makeQuestion() {
  uniqueRandomNumber();
  p = document.createElement('p');
  p.textContent = riddleArray[randomRiddleIndex].riddle;
  questionBox.appendChild(p);
}

/// GAME PAGE: APPEND BUTTONS TO DOM /////
function makeButton() {
  btnOne = document.createElement('button');
  btnOne.textContent = riddleArray[randomRiddleIndex].choiceOne;
  buttonBox.appendChild(btnOne);

  btnTwo = document.createElement('button');
  btnTwo.textContent = riddleArray[randomRiddleIndex].choiceTwo;
  buttonBox.appendChild(btnTwo);

  btnThree = document.createElement('button');
  btnThree.textContent = riddleArray[randomRiddleIndex].choiceThree;
  buttonBox.appendChild(btnThree);

  btnFour = document.createElement('button');
  btnFour.textContent = riddleArray[randomRiddleIndex].choiceFour;
  buttonBox.appendChild(btnFour);
}

/////// GAME PAGE: function for BUTTONS to check answer////
function buttonCheckAnswer() {
  btnOne.addEventListener('click', checkAnswer);
  btnTwo.addEventListener('click', checkAnswer);
  btnThree.addEventListener('click', checkAnswer);
  btnFour.addEventListener('click', checkAnswer);
}

///// GAME PAGE: FUNC TO CHECK ANSWERS and add SCORE /////
function checkAnswer(event) {
  event.preventDefault();
  var button = event.target.textContent;
  console.log(button);
  if (button === riddleArray[randomRiddleIndex].reply) {
    show(answer);
    document.getElementById('answer').innerHTML = 'That is right!';
    currentUserScore += 100;
    console.log('this is the current user Score', userArray[currentUserIndex].username, currentUserScore);
    hide(buttonBox);

  }
  else {
    hide(buttonBox);
    show(answer);
    document.getElementById('answer').innerHTML = 'Thats wrong!!';
  }
}

///// GAME PAGE: FUNC TO NEXT QUESTION ////.
function nextQuestion() {
  hide(p);
  round--;
  hide(answer);
  hide(btnOne);
  hide(btnTwo);
  hide(btnThree);
  hide(btnFour);
  var nextQ = document.getElementById('nextQuestion');
  document.getElementById('scaryLady').width = widthPic[round];
  opacityPic = opacityPic + 0.01;
  document.getElementById('scaryLady').style.opacity = opacityPic;
  if (round === 0) {
    answer.innerHTML = `Your score is: ${currentUserScore}`;
    show(answer);
    hide(nextQ);
    console.log('You are done!!!');
    show(nextPage);
    //// update user array score
    userArray[currentUserIndex].score = currentUserScore;
    console.log('this is the updated userArray', userArray);
    //// place the updated scores in local storage
    saveLocalStorageArray();
  }
  else {
    console.log('This is round', round);
    makeQuestion();
    makeButton();
    show(buttonBox);
    buttonCheckAnswer();
  }
}

// createAllergyArray();

/////// GAME PAGE: call functions
function onGamePageLoad() {
  // createAgeArray();
  createRiddleArray();
  console.log('this is the round number', round);
  retrieveUserArray();
  // createAgeQuestion();
  uniqueRandomNumber();
  p.textContent = riddleArray[randomRiddleIndex].riddle;
  questionBox.appendChild(p);
  hide(nextPage);
  makeButton();
  buttonCheckAnswer();
}

/////// GAME PAGE: gets loaded
onGamePageLoad();







