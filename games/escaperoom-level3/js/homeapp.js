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

///// INDEXPAGE: get user name into local storage///////
var userInput = document.getElementById('userInput');
userInput.addEventListener('submit', handleClick);

///// INDEXPAGE: USER HANDLECLICK EVENT TO Store username /////
function handleClick(event) {
  event.preventDefault();
  location.replace('./html/Game.html');
  var name = event.target.name.value;
  parseLocalStorage();

  if (parseLocalStorageArray){
    userArray = parseLocalStorageArray;
  }
  new MakeUserArray(name);
  saveLocalStorageArray();
}








