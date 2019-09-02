import React, { useState, useContext } from 'react';
import uuid from 'uuid';
import { useQuery } from '@apollo/react-hooks';
import clsx from 'clsx';
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
import { useSummaryStyles, Container } from './styled';
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
    const { getCard, comparator, buildCopyDeckString } = utils;

    const cardContext = useContext(CardContext);
    const [cardRows, setCardRows] = useState([]);
    const [sideCardRows, setSideCardRows] = useState([]);

    const {
        loading,
        data: { singleDeck: deck }
    } = useQuery(DECK_SINGLE_QUERY, {
        variables: { id: props.match.params.id },
        onCompleted: () => {
            // console.log('\n', '\n', `deck = `, deck, '\n', '\n');
            let cardObjArray = [];
            let sideCardObjArray = [];
            const cards = deck.list.split('\n');
            cards.forEach(card => {
                const cardObj = getCard(card, cardContext);
                cardObjArray.push(cardObj);
            });

            if (deck.sideBoardList && deck.sideBoardList.length) {
                const sideCards = deck.sideBoardList.split('\n');
                sideCards.forEach(card => {
                    const cardObj = getCard(card, cardContext);
                    sideCardObjArray.push(cardObj);
                });
            }
            setCardRows(cardObjArray);
            setSideCardRows(sideCardObjArray);
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

    // console.log('\n', '\n', `cardRows = `, cardRows, '\n', '\n');
    // console.log('\n', '\n', `sideCardRows = `, sideCardRows, '\n', '\n');

    return (
        <>
            <DeckNav {...props} copyDeckString={buildCopyDeckString(deck)} />
            <Container style={{ marginTop: '30px' }}>
                <Paper className={clsx(classes.root, classes.responsive)}>
                    <Typography variant="h4">
                        {deck.title} Main Board
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {cardColumns.map((column, index) => (
                                    <TableCell
                                        key={column.name}
                                        align={
                                            column.numeric ? 'center' : 'center'
                                        }
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
                                        <TableCell
                                            className={classes.tableCell}
                                        >
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
                <br />
                <br />
                {deck.sideBoardList && deck.sideBoardList.length && (
                    <Paper className={clsx(classes.root, classes.responsive)}>
                        <Typography variant="h4">Side Board</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {cardColumns.map((column, index) => (
                                        <TableCell
                                            key={column.name}
                                            align={
                                                column.numeric
                                                    ? 'center'
                                                    : 'center'
                                            }
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
                                {sideCardRows.map(row => {
                                    return (
                                        <TableRow key={uuid.v4()}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                className={classes.tableCell}
                                            >
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
                )}
                <Paper className={classes.hideWhenLarge}>
                    <List>
                        {[...cardRows, ...sideCardRows].map((item, index) => (
                            <ListItem key={uuid.v4()}>
                                <ListItemText
                                    primary={`${item.name},   cmc: ${item.cmc}`}
                                    secondary={item.type_line}
                                />
                            </ListItem>
                        ))}{' '}
                    </List>
                </Paper>
            </Container>
        </>
    );
};

export default DeckTable;
