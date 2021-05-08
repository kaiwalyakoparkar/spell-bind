'use strict';

///// GLOBAL VARIABLES AND ARRAYS /////
var parseLocalStorageArray = [];
var userArray = [];
var tbrow = document.createElement('tr');
var table = document.getElementById('table');

/////////////////////////////////////////// GENERAL FUNCTIONS /////////////////////////////////////

///// LOCALSTORAGE: RETRIEVE userArray /////
function parseLocalStorage(){
  var retrieveString = localStorage.getItem('currentUser');
  parseLocalStorageArray = JSON.parse(retrieveString);
  // console.log('this is the parsed Local Storage Array = ', parseLocalStorageArray);
  return parseLocalStorageArray;
}

function retrieveUserArray () {
  parseLocalStorage();
  if (parseLocalStorageArray.length > 0) {
    userArray = parseLocalStorageArray;
  }
  else {
    userArray = [];
  }
}

///// DISPLAY THE TOP USERS //////
function onScorePageLoad(){
  //Retreive the local storage data//
  retrieveUserArray();
  // Get top score
  findTopScore();
  // Display results
  displayHeader();
  displayTopUsers();
}

//// Determine the Top Score ////
function findTopScore(){
  userArray.sort(function(a,b){
    return b.score - a.score;
  });
  console.log('this is the sorted userArray', userArray);
}

/// Make table and attach the top Scores///
function displayHeader(){
  var thEl = document.createElement('th');
  thEl.textContent = 'User';
  tbrow.appendChild(thEl);
  thEl = document.createElement('th');
  thEl.textContent = 'Scores';
  tbrow.appendChild(thEl);
  table.appendChild(tbrow);
}

function displayTopUsers(){
  var toplist = userArray.length;
  if (toplist > 5){
    toplist = 5;
  } 
  else {
    toplist = userArray.length;
  } 
  for (var i = 0; i<toplist; i++){
    tbrow = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = userArray[i].username;
    tbrow.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = userArray[i].score;
    tbrow.appendChild(tdEl);
    table.appendChild(tbrow);
  }
}

/////////////////////////////////////////// CALLING FUNCTIONS /////////////////////////////////////
onScorePageLoad();

