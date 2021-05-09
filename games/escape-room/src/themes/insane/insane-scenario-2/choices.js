const chair = { 
    name: 'Chair',
    id: 'chair',
    description: 'Pick up the chair and swing it at the door handle.',
    result: 'After a couple of hard swings, the door handle finally breaks off... but lands on your foot. Ouch. Lose 5 health points.',
    hp: -5,
    cp: 0
};

const scream = {
    name: 'Scream',
    id: 'scream',
    description: 'Lure the Witch into room by showing off your valuable wand.', 
    result: 'It worked. You attracted the witch\'s attention, and they are now in the room with you. Lock them in the room and steal their wands. Gain 5 clever points but lose 5 health points from the struggle.',
    hp: -5,
    cp: 5
};

const vent = {
    name: 'Vent',
    id: 'vent',
    description: 'You locate an air vent and begin stacking furniture to try and reach it.',
    result: 'Pop open the cover and squeeze through. Crawling on your elbows and knees, you make your way through the dark and dusty vent. Suddenly, the vent collapses, and you fall into the hallway. The fall causes you to lose 10 health points, but you gain 5 clever points for your escape.',
    hp: -10,
    cp: 5
};

const insaneTwoChoices = [chair, scream, vent];

export default insaneTwoChoices;