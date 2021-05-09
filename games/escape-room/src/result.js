import scoreDisplay from './score-display.js';

const outcomeMessage = document.getElementById('outcome');
const buttonNode = document.getElementById('play-again');

const json = window.localStorage.getItem('user');
const user = JSON.parse(json);

scoreDisplay(user);

if(user.hp <= 0) {
    outcomeMessage.textContent = 'Sorry, ' + user.name + ', you were caught! Whomp whomp!';
}
else {
    outcomeMessage.textContent = 'Congratulations, ' + user.name + ', you escaped!';
}

buttonNode.addEventListener('click', function() {
    user.hp = 50;
    user.cp = 0;

    const json = JSON.stringify(user);
    window.localStorage.setItem('user', json);
    
    if(user.completedThemes.length > 3) {
        window.location = '../index.html';
    } 
    else {        
        window.location = '../pages/choose-theme.html';
    }
});