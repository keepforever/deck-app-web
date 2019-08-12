import uuid from 'uuid';

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
}

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
}

function getCardLookup (card) {
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

    let key;
    if (card.includes('//')) {
        key = 'xxx' + cardNumber + set;
    } else {
        key = cardNumber + set;
    }
    return key;
}

function makeLauremString (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

function getCardQuantity (card) {
    return card
        .trim()
        .split(' ')
        .shift();
}

function buildAltCardObject (
    originalCardLookup,
    replacementCardLookup,
    author,
    altCard
) {
    console.log(`
    #########################################################
                    buildAltCardObject Function
    #########################################################
    `);

    let altCardArray;
    if (altCard) {
        altCardArray = JSON.parse(altCard);
    } else {
        altCardArray = [];
    }

    const altCardObj = {
        id: uuid.v4(),
        authorId: author.id,
        authorArenaHandle: author.arenaHandle,
        originalCardLookup,
        replacementCardLookup
    };

    console.log('\n', '\n', `altCardArray before = `, altCardArray, '\n', '\n');

    altCardArray.push(altCardObj);

    console.log('\n', '\n', `altCardArray, after = `, altCardArray, '\n', '\n');
    console.log(`
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        #########################################################
        `);
    return [...altCardArray];
}

export default {
    rarityBorderColor,
    deckNavSwitch,
    getCardNew,
    getCardLookup,
    makeLauremString,
    getCardQuantity,
    buildAltCardObject
};
