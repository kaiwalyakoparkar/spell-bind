const walk = { 
    name: 'Walk In',
    id: 'walk',
    description: 'Carefully stroll into the hallway and head to the potion\'s room with your wand.',
    result: 'You fake a spell, and to your suprise, the enemy nervously agrees. Did they not realize that you\'re bluffing them with a fake spell which will turn them into frog? 10 points for being clever... and super lucky.',
    hp: 0,
    cp: 10
};

const drill = {
    name: 'Drill',
    id: 'drill',
    description: 'Make a human-sized hole in the wall leading straight into the vault because no magic portals.', 
    result: 'Successfully sneak into the vault undetected. Earn 10 clever points, but minus 5 health points for having to re-drill the hole because you didn\'t fit on your first attempt.',
    hp: -5,
    cp: 10
};

const sewer = {
    name: 'Sewer',
    id: 'sewer',
    description: 'You discover an underground moat that leads straight into the vault. Lucky you.',
    result: 'You barely make it into the vault because you had to fight off giant rats in the sewer. Clever approach, but you smell disgusting. Lose 10 health points. Gain 5 clever points.',
    hp: -10,
    cp: 5
};

const bankTwoChoices = [walk, drill, sewer];

export default bankTwoChoices;