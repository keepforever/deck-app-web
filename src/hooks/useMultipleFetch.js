import { useState, useEffect } from 'react';
import mtg from 'mtgsdk';

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
    useEffect(
        () => {
            Promise.all(
                items.map(async (item, index) => {
                    const data = await mtg.card.where({ subtypes: 'goblin' });
                    if (data) {
                        isLoadings[index] = false;
                        results[index] = data[index];
                    } else {
                        isLoadings[index] = false;
                    }
                    console.log('in PromiseAll, isLoadings = ', isLoadings);
                })
            ).then(() => {
                console.log('in then', isLoadings);
                setIsLoadings(isLoadings);
                setResults(results);
            });
        },
        [items]
    );

    return [results, isLoadings];
};
