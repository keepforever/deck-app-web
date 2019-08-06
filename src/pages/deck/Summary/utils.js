import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    root: { background: 'cornsilk', padding: '30px', textAlign: 'center' },
    tableCell: { padding: '0px', margin: '0px' }
}));

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
