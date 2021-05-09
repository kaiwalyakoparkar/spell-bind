const dynamite = { 
    name: 'Smoke Bomb',
    id: 'dynamite',
    description: 'You grab the smoke bomb from your duffle bag.',
    result: 'You are able to cast a spell and blow the vault door off, but you also blow off your big toe.  Lose 10 health points. Sad face.',
    hp: -10,
    cp: 5
};

const bumpKey = {
    name: 'Spell Book',
    id: 'bumpkey',
    description: 'You try the spells that you learnt from a friend.', 
    result: 'You should have known that your friend is a terrble wizard and gave you a fake spell book. You reach for bobbypins instead. It takes more time than you have, but you are able to open the vault door. Lose 10 clever points for trusting your friend. Trust no one.',
    hp: 0,
    cp: -10
};

const fingerprint = {
    name: 'Magic Portal',
    id: 'fingerprint',
    description: 'You just so happen to remember a right spell.',
    result: 'You cast the spell and magic portal helps you out of the vault.  Gain 10 points for being clever and exerting no energy.',
    hp: 10,
    cp: 10
};

const bankTwoChoices = [dynamite, bumpKey, fingerprint];

export default bankTwoChoices;