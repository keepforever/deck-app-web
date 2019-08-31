import uuid from 'uuid';

function rarityBorderColor (str) {
    switch (str) {
        case 'mythic':
            return 'red';
        case 'rare':
            return 'orange';
        case 'uncommon':
            return 'yellow';
        case 'common':
            return '#49fb35';
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

function getCard (card, cardContext) {
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

    let finalCard;
    if (newCardDict[key]) {
        finalCard = newCardDict[key];
        return finalCard;
    } else {
        finalCard = newCardDict['missing'];
        finalCard.name = card;
        return finalCard;
    }
}

function getCardLookup (card, cardContext) {
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
    const newCardDict = cardContext['dict'];

    return newCardDict[key] ? key : card;
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
    // console.log(`
    // #########################################################
    //                 buildAltCardObject Function
    // #########################################################
    // `);

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

    // console.log('\n', '\n', `altCardArray before = `, altCardArray, '\n', '\n');

    altCardArray.push(altCardObj);

    // console.log('\n', '\n', `altCardArray, after = `, altCardArray, '\n', '\n');
    // console.log(`
    //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //     #########################################################
    //     `);
    return [...altCardArray];
}

function getCardByDirectLookup (key, cardContext) {
    const newCardDict = cardContext['dict'];
    return newCardDict[key];
}

/* Summary Page utility */
const comparator = (prop, desc = true) => (a, b) => {
    const order = desc ? -1 : 1;
    if (a[prop] < b[prop]) {
        return -1 * order;
    }
    if (a[prop] > b[prop]) {
        return 1 * order;
    }
    return 0 * order;
};

function buildCardAlternateMap (parsedCardAlt = []) {
    let cardAltMap = {};

    !!parsedCardAlt &&
        parsedCardAlt.length &&
        parsedCardAlt.forEach(c => {
            let temp = [];
            if (!cardAltMap[c.originalCardLookup]) {
                temp.push(c.replacementCardLookup);
                cardAltMap[c.originalCardLookup] = temp;
            } else {
                temp = [
                    ...cardAltMap[c.originalCardLookup],
                    c.replacementCardLookup
                ];
                cardAltMap[c.originalCardLookup] = temp;
            }
        });

    console.log('\n', '\n', `cardAltMap = `, cardAltMap, '\n', '\n');
    return cardAltMap;
}

function buildAltCardItemsArray (
    originalCardLookup = '',
    cardAlternateMap = {},
    cardContext
) {
    const newCardDict = cardContext['dict'];
    let altCardKeys = Object.keys(cardAlternateMap);
    let altCardArray = [];

    if (!altCardKeys.length) return altCardArray;

    altCardKeys.forEach(key => {
        if (key === originalCardLookup) {
            const tempArray = cardAlternateMap[key];
            tempArray.forEach(a => {
                altCardArray.push(newCardDict[a]);
            });
        }
    });

    return altCardArray;
}

function validateAddDeckList (list) {
    let isSideBoard = false;

    const cards = list.split('\n');

    const firstEmptyIndex = cards.indexOf('');

    if (firstEmptyIndex === -1) {
        return true;
    }

    let sideboardStartIndex = -1;
    if (
        firstEmptyIndex > 0 &&
        cards[firstEmptyIndex + 1] &&
        cards[firstEmptyIndex + 1].length
    ) {
        isSideBoard = true;

        sideboardStartIndex = firstEmptyIndex + 1;

        const sideBoardArray = cards.splice(sideboardStartIndex, Infinity);

        const mainBoardArray = cards.splice(0, sideboardStartIndex - 1);

        return [
            isSideBoard,
            // JSON.stringify(sideBoardArray),
            // JSON.stringify(mainBoardArray)
            sideBoardArray.join('\n'),
            mainBoardArray.join('\n')
        ];
    }

    return [false, []];
}

function combineMainAndSideboard (deck) {
    let side = [];
    const main = deck.list.split('\n');
    if (deck.sideBoardList) {
        side = deck.sideBoardList.split('\n');
    }

    return [...main, ...side];
}

export default {
    buildCardAlternateMap,
    rarityBorderColor,
    deckNavSwitch,
    getCard,
    getCardLookup,
    makeLauremString,
    getCardQuantity,
    buildAltCardObject,
    comparator,
    getCardByDirectLookup,
    buildAltCardItemsArray,
    validateAddDeckList,
    combineMainAndSideboard
};
