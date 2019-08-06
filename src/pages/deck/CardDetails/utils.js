import { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
import mtg from 'mtgsdk';
// constext
import { CardContext } from '../../../context/card';


export const getCard = (card, cardContext) => {
    const set = card.match(/\((.*)\)/).pop().toLowerCase();
    const cardNumber = card.trim().split(' ').slice(-1).pop();
    const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - 1];
    const finalCard = cardContext[`${set}`][finalCardKey];
    return finalCard;
}

export const useCard = (card) => {
    const cardContext = useContext(CardContext);
    const set = card.match(/\((.*)\)/).pop().toLowerCase();
    const cardNumber = card.trim().split(' ').slice(-1).pop();
    console.log('\n', '\n', `set, cardNumber = `, set, cardNumber, '\n', '\n');
    const finalCardKey = Object.keys(cardContext[`${set}`])[cardNumber - 1];
    const finalCard = cardContext[`${set}`][finalCardKey];
    console.log('\n', '\n', `finalCard = `, finalCard, '\n', '\n');
    return finalCard;
};

export const buildUrlArray = async (listString = '') => {
    console.log('\n', '\n', `listString = `, listString, '\n', '\n');
    // METHOD ONE
    // const [a, b, c] = await Promise.all([mtg.set.find('AER'), mtg.set.find('AER'), mtg.set.find('AER')]);
    // console.log(`a = ${a} \n b = ${b} \n c = ${c}`);

    // METHOD TWO
};

const urls = ['1', '2', '3'];

export async function getCards () {
    // let cards = [];
    for (const [idx, url] of urls.entries()) {
        const card = await mtg.card.where({ subtypes: 'goblin' });
        console.log(`
        #########################################################
                        getCards()
        #########################################################
        `);

        console.log(`Received Card ${idx + 1}:`, JSON.stringify(card[idx]));

        console.log(`
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        #########################################################
        `);
    }

    console.log('Finished!');
}

export const useFetch = arg => {
    // console.log('\n', '\n', `useFetch ran = `, randomTodo, '\n', '\n');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {
            setLoading(true);
            mtg.card.where({ subtypes: 'goblin' })
                .then(c => {
                    // console.log('\n', '\n', `useFetch, res = `, res, '\n', '\n');
                    setData(c[0]);
                    setLoading(false);
                });
        },
        [arg, setData]
    );
    return { data, loading };
};
