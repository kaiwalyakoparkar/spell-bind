const moat = { 
    name: 'Moat',
    id: 'moat',
    description: 'Risk fighting giant rats in the sewer and crawl your way to freedom.',
    result: 'Now that you have the potions, the rats seem to be afraid of you... or is it your magic? you catch them and put it in your bag for spell experiments. You drench yourself in filth yet again. Lose 10 health points for being hazardous to your health.',
    hp: -10,
    cp: 0
};

const fightPolice = {
    name: 'Fight the Enemies',
    id: 'fight-police',
    description: 'You brave soul. Good luck.', 
    result: '10 health points for trying... and succeeding. Your efforts were worthwhile.',
    hp: 10,
    cp: 0
};

const helicopter = {
    name: 'Flying Cloak',
    id: 'helicopter',
    description: 'Fly away to freedom.',
    result: 'Your apprentice arrives on scene to save you with a flying cloak. You put on the cloak and laugh at the enemy below trying to catch you. Little do you know, your apprentice had a little too much to drink while waiting for you to steal the potions. Your apprentice brought an invisibilty cloak and not flying cloak. you fall and spin out of control and you crash into the ocean.',
    hp: -60,
    cp: 10
};

const bankThreeChoices = [moat, fightPolice, helicopter];

export default bankThreeChoices;