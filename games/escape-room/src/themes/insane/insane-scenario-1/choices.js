const needle = { 
    name: 'Needle',
    id: 'needle',
    description: 'You glance over at the bedside table and see that a needle has been left there. Odd, but could come in handy.',
    result: 'Scoot your body as close to the edge of the bed as possible and barely grab the needle with your teeth. You lower it down to your hands and begin picking the keyhole with the needle tip. Smart thinking earns you 5 clever points.',
    hp: 0,
    cp: 5
};

const hammer = {
    name: 'Hammer',
    id: 'hammer',
    description: 'Use your feet to quietly open the top drawer of the bedside table to find a reflex hammer inside.', 
    result: 'You smash open the handcuffs and are able to break free.  In the process, you injure yourself  and lose 10 health points.',
    hp: -10,
    cp: 0
};

const bruteForce = {
    name: 'Brute Force',
    id: 'brute-force',
    description: 'You wonder if you are strong enough to break free from the handcuffs with sheer force.',
    result: 'You are mighty strong! You are able to break free from the handcuffs.  The adrenaline rush boosts your health by 10 points.',
    hp: 10,
    cp: 0
};

const insaneOneChoices = [needle, hammer, bruteForce];

export default insaneOneChoices;