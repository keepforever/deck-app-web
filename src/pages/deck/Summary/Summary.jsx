import React, { useState, useContext } from 'react';
// material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
// locals
import { AuthContext } from '../../../context/auth';
import { CardContext } from '../../../context/card';
import DeckNav from '../../../comps/Deck/DeckNav';
// utils
import { useSummaryStyles } from './styled';
import utils from '../../../utils';

// generic function to help with sorting.
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

const DeckTable = props => {
    const { getCard } = utils;
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    const deck =
        authContext.user &&
        authContext.user.decks.filter(d => {
            return d.id === props.match.params.id;
        })[0];

    let cardObjArray = [];

    if (deck && deck.list) {
        const cards = deck.list.split('\n');
        cards.forEach(card => {
            const cardObj = getCard(card, cardContext);
            cardObjArray.push(cardObj);
        });
    }

    const classes = useSummaryStyles();

    const [cardColumns, setCardColumns] = useState([
        { name: 'name', active: false },
        { name: 'cmc', active: false, numeric: true },
        { name: 'rarity', active: false },
        { name: 'color', active: false },
        { name: 'type', active: false }
    ]);

    const [cardRows, setCardRows] = useState(cardObjArray);

    const onCardSortClick = index => () => {
        setCardColumns(
            cardColumns.map((column, i) => ({
                ...column,
                active: index === i,
                order:
                    (index === i &&
                        (column.order === 'desc' ? 'asc' : 'desc')) ||
                    undefined
            }))
        );
        setCardRows(
            cardRows
                .slice()
                .sort(
                    comparator(
                        cardColumns[index].name.toLowerCase(),
                        cardColumns[index].order === 'desc'
                    )
                )
        );
    };

    if (!deck) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <DeckNav {...props} />
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {cardColumns.map((column, index) => (
                                <TableCell
                                    key={column.name}
                                    align={column.numeric ? 'center' : 'center'}
                                >
                                    <TableSortLabel
                                        active={column.active}
                                        direction={column.order}
                                        onClick={onCardSortClick(index)}
                                    >
                                        {column.name}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardRows.map(row => {
                            return (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {row.cmc || 0}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.rarity}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.color}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.type_line}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default DeckTable;
