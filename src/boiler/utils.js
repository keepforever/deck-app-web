import { useEffect, useState, useContext } from 'react';
import mtg from 'mtgsdk';
import { CardContext } from '../../context/card';
import { AuthContext } from '../../context/auth';
import grn from '../assets/sets/grn.json';
import m19 from '../assets/sets/m19.json';
import dar from '../assets/sets/dar.json';
import xln from '../assets/sets/xln.json';
import rna from '../assets/sets/rna.json';

export const useFetch = arg => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        mtg.card.where({ subtypes: 'goblin' }).then(c => {
            setData(c[0]);
            setLoading(false);
        });
    }, [arg, setData]);
    return { data, loading };
};

export const deckNavSwitch = str => {
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

export const getCardNew = (card, cardContext) => {
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
    const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - 1];
    const finalCard = cardContext[`${set}`][finalCardKey];
    return finalCard;
};

export const useCard = card => {
    const cardContext = useContext(CardContext);
    const set = card
        .match(/\((.*)\)/)
        .pop()
        .toLowerCase();
    const cardNumber = card
        .trim()
        .split(' ')
        .slice(-1)
        .pop();
    const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - 1];
    const finalCard = cardContext[`${set}`][finalCardKey];
    return finalCard;
};

// import React from 'react';

// no longer using this function
export const loadSetData = setCode => {
    const valueSwitch = set => {
        switch (set) {
            case 'grn':
                return grn;
            case 'm19':
                return m19;
            case 'dar':
                return dar;
            case 'xln':
                return xln;
            case 'rna':
                return rna;
            default:
                return 'error-in-valueSwitch';
        }
    };
    return valueSwitch(setCode);
};

/**
 *
 * @param {array} items - it would be an array which contains api params.
 * @returns [ result: data[], isLoadings: boolean[], isErrors: boolean[] ]
 */
export const useMultipleFetch = items => {
    const [isLoadings, setIsLoadings] = useState(
        Array(items.length).fill(true)
    );
    const [results, setResults] = useState(Array(items.length).fill(''));
    useEffect(() => {
        Promise.all(
            items.map(async (item, index) => {
                const data = await mtg.card.where({ subtypes: 'goblin' });
                if (data) {
                    isLoadings[index] = false;
                    results[index] = data[index];
                } else {
                    isLoadings[index] = false;
                }
            })
        ).then(() => {
            setIsLoadings(isLoadings);
            setResults(results);
        });
    }, [items]);

    return [results, isLoadings];
};

// import { buildUrlArray } from './utils';
// import { useMultipleFetch } from '../../hooks/useMultipleFetch';

// const { data } = useFetch(1);

// USE MULTIPLE FETCH
// const [data, isLoadings] = useMultipleFetch([1, 2, 3]);
// useEffect(
//     () => {
//         setDeckState(data);
//     },
//     [data]
// );

// deck && buildUrlArray(deck.list);


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
