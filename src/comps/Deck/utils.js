import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

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
        key = set + cardNumber;
    }

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

export const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '600px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    input: {
        color: 'black',
        background: 'white',
        border: '1px solid grey',
        fontSize: '14px',
        padding: '5px 10px'
    },
    loginButton: {
        background: 'blue',
        color: 'white',
        padding: '10px 0px',
        marginBottom: '12px',
        marginTop: '24px'
    }
}));
