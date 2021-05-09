import allThemes from './quests.js';
import scoreDisplay from './score-display.js';

const json = window.localStorage.getItem('user');
if(!json) {
    window.location = '/';
}
const user = JSON.parse(json);

scoreDisplay(user);

const themesNode = document.getElementById('themes');
const textInsaneNode = document.getElementById('insane-text');
const textBankNode = document.getElementById('bank-text');


for(let i = 0; i < allThemes.length; i++) {
    const currentTheme = allThemes[i];
    const li = document.createElement('li');
    const link = document.createElement('a');
    const linkImage = document.createElement('img');
    
    if(user.completedThemes.includes(currentTheme.id)){
        li.style.visibility = 'hidden';
    }

    link.href = 'quest.html?name=' + encodeURIComponent(currentTheme.id) + '&scenario=0';

    if(currentTheme.id === 'insane-quest') {
        linkImage.src = '../assets/img/green-arrow-left.png';
        link.appendChild(linkImage);

        if(user.completedThemes.includes(currentTheme.id)) {
            textInsaneNode.style.visibility = 'hidden';
        }
        else {
            textInsaneNode.textContent = 'Witch Wit';
        }

        linkImage.classList.add('resize');
    }
    else {
        linkImage.src = '../assets/img/green-arrow-right.png';
        link.appendChild(linkImage);

        if(user.completedThemes.includes(currentTheme.id)) {
            textBankNode.style.visibility = 'hidden';
        }
        else {
            textBankNode.textContent = 'Potion Scrape';
        }

        linkImage.classList.add('resize');     
    }
    themesNode.appendChild(li);
    li.appendChild(link);
}