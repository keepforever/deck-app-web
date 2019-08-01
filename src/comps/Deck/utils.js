import { useEffect, useState } from 'react';
// import axios from 'axios';
import mtg from 'mtgsdk';

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
