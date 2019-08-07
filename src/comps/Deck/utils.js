import { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
import mtg from 'mtgsdk';
// constext
import { CardContext } from '../../context/card';

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
