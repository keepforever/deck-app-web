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
        console.log(`Received Card ${idx + 1}:`, JSON.stringify(card[idx]));
    }

    console.log('Finished!');
}
