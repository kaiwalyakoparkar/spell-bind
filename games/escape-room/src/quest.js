import allThemes from './quests.js';
import scoreDisplay from './score-display.js'; 

const json = window.localStorage.getItem('user');
if(!json) {
    window.location = '/';
}
const user = JSON.parse(json);

scoreDisplay(user);

const htmlNode = document.getElementById('background-image');
const formNode = document.getElementById('choices');
const titleNode = document.getElementById('title');
const descriptionNode = document.getElementById('quest-description');
const resultNode = document.getElementById('scenario-result');
const resultParagraph = document.getElementById('result');
const continueButton = document.getElementById('continue');

const searchParams = new URLSearchParams(window.location.search);
const questTitle = searchParams.get('name');
let scenarioTitle = parseInt(searchParams.get('scenario'));

let currentTheme = null;
for(let i = 0; i < allThemes.length; i++) {
    if(questTitle === allThemes[i].id) {
        currentTheme = allThemes[i];
        break;
    }
}

titleNode.textContent = currentTheme.title;

descriptionNode.textContent = currentTheme['description' + String(scenarioTitle)];

const allScenarios = currentTheme.scenarios;

let chosen = null;
const currentScenario = allScenarios[scenarioTitle];

for(let i = 0; i < currentTheme.images.length; i++) {
    if(scenarioTitle === i) {
        htmlNode.style.backgroundImage = currentTheme.images[i];
        htmlNode.classList.add('resize');
    }
}

for(let i = 0; i < currentScenario.length; i++) {
    chosen = currentScenario[i];
    const label = document.createElement('label');
    label.for = chosen.id;
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = chosen.id; 
    radio.name = 'insane-choices'; // also applies to bank choices
    radio.value = chosen.id; 
    radio.required = true;
    
    label.textContent = chosen.name + ' - ' + chosen.description;
    
    formNode.prepend(label);
    formNode.prepend(radio);
    formNode.prepend(document.createElement('br'));
    formNode.prepend(document.createElement('br'));
}

formNode.addEventListener('submit', function(event) {
    event.preventDefault();
    formNode.hidden = true;
    resultNode.hidden = false;
    const formData = new FormData(formNode);
    const choice = formData.get('insane-choices');
    
    for(let i = 0; i < currentScenario.length; i++) {
        let chosen = currentScenario[i];
        
        if(choice === chosen.id) {
            user.completedThemes.push(currentTheme.id);
           
            resultParagraph.textContent = chosen.result;
            resultParagraph.classList.add('bold'); 
            
            user.hp += chosen.hp;
            user.cp += chosen.cp;

            const json = JSON.stringify(user);
            window.localStorage.setItem('user', json);

            scoreDisplay(user);
        }
    }
});

continueButton.addEventListener('click', function(event) {
    event.preventDefault();
    if(scenarioTitle < currentScenario.length) {
        scenarioTitle++;
        searchParams.set('scenario', scenarioTitle);
        window.location.search = searchParams;
    }

    if(scenarioTitle === currentScenario.length) {
        window.location = '../pages/result.html';
    }
});