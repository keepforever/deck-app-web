import { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import { CardContext } from '../../../context/card';

export const getCard = (card, cardContext) => {
    const set = card
        .match(/\((.*)\)/)
        .pop()
        .toLowerCase();

    const cardNumber = card
        .trim()
        .split(' ')
        .slice(-1)
        .pop();

    let cardNumberOffset = 1;

    if (set === 'xln') {
        cardNumberOffset = 0;
    }

    const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - cardNumberOffset];

    const finalCard = cardContext[`${set}`][finalCardKey];

    return finalCard;
};

export const getCardNew = (card, cardContext) => {
    const set = card
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
    const finalCard = newCardDict[`${key}`];
    return finalCard;
};

export function getCardQuantity (card) {
    return card
        .trim()
        .split(' ')
        .shift();
}

export function useDeck (deckId = '') {
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    if (!authContext.user) return [null, null];

    const deck =
        authContext.user &&
        authContext.user.decks.filter(d => {
            return d.id === deckId;
        })[0];

    let cardObjArray = [];

    if (deck && deck.list) {
        const cards = deck.list.split('\n');
        cards.forEach(card => {
            const cardObj = getCard(card, cardContext);
            cardObj.quantity = getCardQuantity(card);
            cardObjArray.push(cardObj);
        });
    }

    return [cardObjArray, deck.list];
}
