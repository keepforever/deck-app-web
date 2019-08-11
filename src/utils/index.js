function rarityBorderColor (str) {
    switch (str) {
        case 'M':
            return 'orange';
        case 'R':
            return 'yellow';
        case 'U':
            return 'blue';
        case 'C':
            return 'white';
        default:
            return 'white';
    }
}

function deckNavSwitch (str) {
    switch (str) {
        case 'summary':
            return 0;
        case 'edit':
            return 1;
        case 'card-details':
            return 2;
        default:
            return 0;
    }
};

function getCardNew (card, cardContext) {
    const set = card
        .trim()
        .match(/\((.*)\)/)
        .pop()
        .toLowerCase();
    const cardNumber = card
        .trim()
        .split(' ')
        .slice(-1)
        .pop();

    const newCardDict = cardContext['dict'];

    let key;
    if (card.includes('//')) {
        key = 'xxx' + cardNumber + set;
    } else {
        key = cardNumber + set;
    }

    console.log('\n', '\n', `key = `, key, '\n', '\n');

    const finalCard = newCardDict[key];
    return finalCard;
};

export default {
    rarityBorderColor,
    deckNavSwitch,
    getCardNew
};
