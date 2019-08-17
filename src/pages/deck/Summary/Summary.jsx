import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
// material-ui
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
// locals
import DECK_SINGLE_QUERY from '../../../graphql/q/DECK_SINGLE_QUERY';
import { CardContext } from '../../../context/card';
import DeckNav from '../../../comps/Deck/DeckNav';
// utils
import { useSummaryStyles } from './styled';
import utils from '../../../utils';

const DeckTable = props => {
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
    const classes = useSummaryStyles();
    const { getCard, comparator } = utils;

    const cardContext = useContext(CardContext);
    const [cardRows, setCardRows] = useState([]);

    const {
        loading,
        data: { singleDeck: deck }
    } = useQuery(DECK_SINGLE_QUERY, {
        variables: { id: props.match.params.id },
        onCompleted: () => {
            let cardObjArray = [];
            const cards = deck.list.split('\n');
            cards.forEach(card => {
                const cardObj = getCard(card, cardContext);
                cardObjArray.push(cardObj);
            });
            setCardRows(cardObjArray);
        }
    });

    const [cardColumns, setCardColumns] = useState([
        { name: 'name', active: false },
        { name: 'cmc', active: false, numeric: true },
        { name: 'rarity', active: false },
        { name: 'color', active: false },
        { name: 'type', active: false }
    ]);

    if (loading || !cardRows.length) return <CircularProgress />;

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
