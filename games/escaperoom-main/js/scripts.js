var slamDoor = new Audio("audio/close_door.mp3");
var creakingDoor = new Audio("audio/squeaking_door.mp3");
var tada = new Audio("audio/tada.mp3");
var escaped = false;

function startGame() {
  slamDoor.play();
  setTimeout(function() {
    creakingDoor.play();
  }
  , 3000);
  $("#intro-photo").hide();
  $("#narrative-one").fadeIn(2000);
};

function toRoomOne() {
  $("#narrative-one").hide();
  $("#room-one").fadeIn(2000);
  $(".countdown-clock").show();
};
// Beginning of Room ONE
function clickBoard(){
  $("#password-img").show();
};

function clickPC(){
  $("#password-img").hide();
  $("#pc-area").show();
};

function clickClorox(){
  $("#rm-one-message").show();
  $("#pc-area").hide();
  $('#room-one-key').show();
  setTimeout(function(){
    $("#room-one").hide();
    $("#narrative-two").fadeIn(2000);
  } , 3000);
};
// Set the game timer
var gameTimer = 300000;
var countDownDate = new Date().getTime() + gameTimer;
// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = makeMeTwoDigits(minutes) + ":" + makeMeTwoDigits(seconds);

  if (distance < 0 && !escaped) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
    $('div').hide();
    $("#time-expired").show();
  }
}, 1000);

function makeMeTwoDigits(n){
    return (n < 10 ? "0" : "") + n;
}
// End of Room ONE
// Beginning of Room TWO
function toRoomTwo() {
  $("#narrative-two").hide();
  $("#room-two").fadeIn(2000);
  setTimeout(function(){
    $("#ghost-casper").fadeIn(3000);
    $("#answer-options").fadeIn(5000);
  } , 3000);
};

function clickNo(){
  $("#casper-message-box").hide();
  $("#answer-options").hide();
  $("#casper-message").text("Please play a game with me....I'm so lonely...");
  $("#casper-message-box").fadeIn(2000);
  $("#answer-options").fadeIn(2000);
};

function clickYes() {
  $("#casper-message-box").hide();
  $("#answer-options").hide();
  $("#tic-tac-toe-area").show();
  ticTacFirstTurn();
};

// Tic-Tac-Toe Game
function TicTacPlayer (player) {
  this.name = player;
  this.pieceLocations = [];
};
var ticTacPlayerOne = new TicTacPlayer("Player ONE");
var ticTacPlayerTwo = new TicTacPlayer("Computer");
var ticTacCounter = 0;
const imgX = 'img/x.png';
const imgO = 'img/1.png';
const imgClear = 'img/clear.png';
const ticTacWinCondition = [["1a", "1b", "1c"], ["2a", "2b", "2c"], ["3a", "3b", "3c"], ["1a", "2a", "3a"], ["1b", "2b", "3b"], ["1c", "2c", "3c"], ["1a", "2b", "3c"], ["1c", "2b", "3a"]];
var ticTacBoard = ['1a', '2a', '3a', '1b', '2b', '3b', '1c', '2c', '3c'];
var ticTacPlayArea = ['1a', '2a', '3a', '1b', '2b', '3b', '1c', '2c', '3c'];
var ticTacGameOver = false;

// change imgage on tic tac board
function ticTacChangeImage(id, img){
  var location = id+"pic";
  document.getElementById(location).src = img;
};

// check id of element for tic tac toe play area and change icon to match player
function playTicTac(id) {
  if(ticTacPlayArea.indexOf(id) >= 0){
    ticTacPlayArea.splice(ticTacPlayArea.indexOf(id), 1);
    if (ticTacCounter%2){
      ticTacPlayerOneTurn(id);
      } else {
      ticTacPlayerTwoTurn(id);
    };
    ticTacCheckWinCondition();
    ticTacCounter += 1;
    if(ticTacPlayerTwo.name === "Computer" && ticTacCounter%2 === 0 && !ticTacGameOver){
      setTimeout(function(){
        ticTacComputerAI();
      },1000);
    };
  };
};

function ticTacPlayerOneTurn(id) {
  ticTacChangeImage(id,imgX);
  ticTacPlayerOne.pieceLocations.push(id);
  $("#tictactoe-message").text(ticTacPlayerTwo.name + " Turn");
};

function ticTacPlayerTwoTurn(id) {
  ticTacChangeImage(id,imgO);
  ticTacPlayerTwo.pieceLocations.push(id);
  $("#tictactoe-message").text(ticTacPlayerOne.name + " Turn");
};

// AI will pick from available spots on board and choose move base on board layout
function ticTacComputerAI() {
  var id = ticTacPlayArea[ticTacGetRandomInt(ticTacPlayArea.length)-1];
  var priority = 0;
  var p1RemainingMoves = [];
  var p2RemainingMoves = [];
  for(var i = 0; i < ticTacWinCondition.length; i++){
    p1RemainingMoves = ticTacWinCondition[i].map(function(loc){
      return loc;
    });
    p2RemainingMoves = ticTacWinCondition[i].map(function(loc){
      return loc;
    });
    ticTacWinCondition[i].forEach(function(location){
      if (ticTacPlayerOne.pieceLocations.indexOf(location) > -1){
        p1RemainingMoves.splice(p1RemainingMoves.indexOf(location), 1);
      };
      if (ticTacPlayerTwo.pieceLocations.indexOf(location) > -1){
        p2RemainingMoves.splice(p2RemainingMoves.indexOf(location), 1);
      };
    });
    if(p2RemainingMoves.length === 1 && ticTacPlayArea.indexOf(p2RemainingMoves[0]) >= 0){
      id = p2RemainingMoves[0];
      i = ticTacWinCondition.length;
    } else if(p1RemainingMoves.length === 1 && ticTacPlayArea.indexOf(p1RemainingMoves[0]) >= 0){
      id = p1RemainingMoves[0];
      priority = 1;
    } else if(p2RemainingMoves.length === 2 && p1RemainingMoves.length === 3 && priority !== 1){
      id = p2RemainingMoves[ticTacGetRandomInt(2)-1];
    };

  };

  playTicTac(id);
};

function ticTacCheckWinCondition() {
  var p1Count = 0;
  var p2Count = 0;
  ticTacWinCondition.forEach(function(winningArray){
    p1Count = 0;
    p2Count = 0;
    winningArray.forEach(function(location){
      if (ticTacPlayerOne.pieceLocations.indexOf(location) > -1){
        p1Count += 1;
      };
      if (ticTacPlayerTwo.pieceLocations.indexOf(location) > -1){
        p2Count += 1;
      };
    });
    if(p1Count === 3){
      ticTacGameOver = true;
      $("#tic-tac-toe-area").hide();
      document.getElementById('casper-img').src = 'img/casper.png';
      $("#casper-message").text("Wow you won! I'll open the elevator for you.");
      $("#casper-message-box").fadeIn(2000);
      setTimeout(function(){
        document.getElementById('elevator').src = 'img/elevator-open.jpg';
      }, 1000);
      setTimeout(function(){
        $("#room-two").hide();
        $("#narrative-three").fadeIn(2000);
      } , 5000);
    } else if (p2Count === 3){
      ticTacGameOver = true;
      $("#tic-tac-toe-area").hide();
      resetTicTac();
      $("#casper-message").text("Would you like to play again?");
      $("#casper-message-box").fadeIn(2000);
      $("#answer-options").fadeIn(2000);
    };
  });

  if(!ticTacGameOver && ticTacPlayArea.length === 0){
    $("#tic-tac-toe-area").hide();
    resetTicTac();
    $("#casper-message").text("Would you like to play again?");
    $("#casper-message-box").fadeIn(2000);
    $("#answer-options").fadeIn(2000);
  };
};

// reset the tic tac toe game to default
function resetTicTac(){
  ticTacCounter = 0;
  ticTacGameOver = false;
  ticTacPlayArea = new Array(ticTacBoard.length);
  while(ticTacPlayerOne.pieceLocations.length > 0) {
    ticTacPlayerOne.pieceLocations.pop();
  };
  while(ticTacPlayerTwo.pieceLocations.length > 0) {
    ticTacPlayerTwo.pieceLocations.pop();
  };
  ticTacPlayArea = ticTacBoard.map(function(loc){
    ticTacChangeImage(loc, imgClear);
    return loc;
  });

}

// return a random number from 1 to max
function ticTacGetRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)+1);
};

// decide who go first
function ticTacFirstTurn() {
  ticTacCounter = ticTacGetRandomInt(2);
  if(ticTacCounter === 1){
    $("#tictactoe-message").text(ticTacPlayerOne.name + " Turn");
  } else {
    $("#tictactoe-message").text(ticTacPlayerTwo.name + " Turn");
    if(ticTacPlayerTwo.name === "Computer"){
      setTimeout(function(){
        ticTacComputerAI();
      }, 1000);
    };
  };
};

// End of Room TWO
// Beginning of Room THREE
function toRoomThree() {
  $("#narrative-three").hide();
  $(".room-three").fadeIn(2000);
};

//Hangman Game
function startHangman() {
  $(".twentyone-buttons").hide();
  $(".result").hide();
  $(".wrapper").show();

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }


  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is FIFA World Cup Football Teams";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Monsters";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Intro To Programming";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        escaped = true;
        $(".countdown-clock").hide();
        setTimeout(function(){
          $(".hide").show();
          $(".wrapper").hide();
          tada.play();
        }, 3000);
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }


   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };

   frame2 = function() {
     draw (10, 0, 10, 600);
   };

   frame3 = function() {
     draw (0, 5, 70, 5);
   };

   frame4 = function() {
     draw (60, 5, 60, 15);
   };

   torso = function() {
     draw (60, 36, 60, 70);
   };

   rightArm = function() {
     draw (60, 46, 100, 50);
   };

   leftArm = function() {
     draw (60, 46, 20, 50);
   };

   rightLeg = function() {
     draw (60, 70, 100, 100);
   };

   leftLeg = function() {
     draw (60, 70, 20, 100);
   };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }


  // Play
  play = function () {
    categories = [
        ["colombia", "portugal", "argentina","brasil", "spain", "belgium", "germany"],
        ["chupacabra", "zombie", "bigfoot", "mummy", "vampire", "werewolf", "godzilla"],
        ["github", "constructor", "bootstrap", "javascript", "prototypes", "looping", "function"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  // Hint

    hint.onclick = function() {

      hints = [
        ["The Coffee Growers", "The Navigators", "The White and Sky-Blue", "Little Canary", "The Red One", "The Red Devils", "The October Fest"],
        ["Mexican myth or vampiric creature", "Walking corpse without soul", "Harry elusive giant", "Ancient Egyptian corpse", "Blood drinking fanged creature", "Man turns into beast during fullmoon", "A monster of Japanese origin"],
        ["Create repositories and stores codes", "A function that can be invoked to create new objects", "Front-end framework", "Programming language used to make web pages interactive", "Is an object from which other objects inherit methods", "Repeating the same block of code until it is specified to stop", "Block of code that performs an action and returns a result" ]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}
// business logic for 21 dice game
function startTwentyone() {
  $(".wrapper").show();
  $('html, body').animate({scrollTop:$(document).height()
  }, 'slow');
};



var total = 0;
var roundScore = 0;
var playerOneTurn = true;
var playerTwoTurn = false;
var playerOneScore = 0;
var playerTwoScore = 0;

var gameSetup;

var gameInput = function(players, dice, goal){
  this.noOfPlayers = players;
  this.noOfDice= dice;
  this.goal=goal;
}
function roll(dice){
  if (playerOneTurn){
    total = Math.floor((Math.random() * 5)+1);
    console.log("Total: " + total);
    if (total%2===0){
      total=0;
      changeTurns();
    }
    roundScore=roundScore+total;
    total=0;
  } else if (playerTwoTurn) {
    total = Math.floor((Math.random() * 5)+1);;
  if (total%2===0){
      total=0;
      changeTurns();
    }
    roundScore=roundScore+total;
    total=0;
    roundScore+=total;
  }
}
function changeTurns(){
  checkWinner();
  playerOneTurn = !playerOneTurn;
  playerTwoTurn = !playerTwoTurn;
  roundScore = 0;
  $(".player-one").toggle();
  $(".player-two").toggle();
  if (playerTwoTurn){
  for(i=0; i<1 ;i++){
    total = Math.floor((Math.random() * 5)+1);
    console.log("Computer Roll: " + total);
    if (total%2===0){
      total=0;
      $("#player-two-total").text(playerTwoScore);
      $("#player-two-round-total").text(roundScore);
      break;
    }
    roundScore=roundScore+total;
    total=0;
  };
  hold();
  };
};
function hold(){
  if (playerOneTurn){
    playerOneScore+=roundScore;
  } else if (playerTwoTurn){
    playerTwoScore+=roundScore;
  }
  roundScore = 0;
  changeTurns();
}
function checkWinner(){
if((playerOneScore>=21)){
  $(".result").text("Player One Winner" + "," + " " + "Click and Advance");
  $(".result").show();
  $(".initial-hide").hide();
  $(".hide-21").hide();
}
else if (playerTwoScore>=21) {
  $(".result").text("Ghost Wins" + "," + " " + "Try-Again");
  $(".result").show();
  $(".initial-hide").hide();
  $(".hide-21").hide();
  $("#21-try-again").show();
}
}
function myFunction() {
    $(".result").hide();
    $("#21-try-again").hide();
    $(".initial-hide").show();

    document.getElementById("game-input").reset();
    $("#reset").trigger("reset");
    playerOneScore=0;
    playerTwoScore=0;
    $("#player-one-total").text(playerOneScore);
      $("#player-two-total").text(playerTwoScore);
}
// UI
$(document).ready(function(){
  $("#start-21").click(function(){
    $("#twenty-one").show();
    $(".room-three").hide();
  });
  $("form#game-input").submit(function(event) {
    event.preventDefault();
    var playerNumber = $("#player-number").val();
    var dice = $("#dice").val();
    var goal = $("#goal").val();
    gameSetup = new gameInput(playerNumber, dice, goal);
    $("#game-input").hide();

    $(".initial-hide").show();

    $(".player-two").hide();
  });
  $("#roll-playerone").click(function(event) {
    event.preventDefault();
    roll(dice);
    $("#player-one-total").text(playerOneScore);
    $("#player-one-round-total").text(roundScore);
    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });
  $("#hold-player-one").click(function(event) {
    event.preventDefault();
    hold();
    $("#player-one-total").text(playerOneScore);
    $("#player-one-round-total").text(roundScore);
    $("#player-two-total").text(playerTwoScore);
    $("#player-two-round-total").text(roundScore);
  });

// Room ONE form
  $("#form-wifi").submit(function(event){
    event.preventDefault();
    var wifiPassword = $("input#wifi").val();
    if(wifiPassword === "LoveYourClassmates"){
      $("#form-wifi").hide();
      $("#email").show();
      $("#clorox").show();
    } else {
      $("#wifi").val("");
    };
    $("#form-wifi").trigger("reset");
    return false;
  });
});
