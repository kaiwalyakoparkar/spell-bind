const fight = { 
    name: 'Fight',
    id: 'fight',
    description: 'The witch notice your strange behavior and charge towards you. Your adrenaline is pumping, mind is racing, and you decide to stand your ground.',
    result: 'What were you thinking?! Adrenaline is no match for 6 burly witches. You\'re taken down and captured.',
    hp: -60,
    cp: -10
};

const run = {
    name: 'Run',
    id: 'run',
    description: 'You notice an open window at the end of the hall. 6 witches stand between you and freedom. Make a run for it?',
    result: 'You zig while they zag. You barely make it through the window. Lucky for you, you were on the second floor. Lose 5 health points from the fall.',
    hp: -5,
    cp: 0
};

const distract = {
    name: 'Distract',
    id: 'distract',
    description: 'You need a distraction to get past all the witches. Incite mayhem.',
    result: 'Run around opening any door you see, releasing the CRAZIES! This plan works perfectly, and you manage to escape!  Gain 10 clever points.',
    hp: 0,
    cp: 10
};

const insaneThreeChoices = [fight, run, distract];

export default insaneThreeChoices;