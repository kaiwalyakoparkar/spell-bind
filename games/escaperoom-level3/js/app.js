'use scrict';
///// GLOBAL ARRAYS /////
var userArray = [];
var parseLocalStorageArray = [];

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
function saveLocalStorageArray(){
  var storeString = JSON.stringify(userArray);
  localStorage.setItem('currentUser', storeString);
}

///// INDEXPAGE: function LOCALSTORAGE RETRIEVE userArray /////
function parseLocalStorage(){
  var retrieveString = localStorage.getItem('currentUser');
  parseLocalStorageArray = JSON.parse(retrieveString);
  console.log('this is the parsed Local Storage Array = ', parseLocalStorageArray);
  return parseLocalStorageArray;
}

///// INDEXPAGE: USER CONSTRUCTOR /////
function MakeUserArray(username){
  this.username = username;
  this.score = 0;
  userArray.push(this);
}







