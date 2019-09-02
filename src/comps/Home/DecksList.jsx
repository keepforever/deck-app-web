import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List as VirtualList, AutoSizer } from 'react-virtualized';
import clsx from 'clsx';
// material-ui
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// locals

const useStyles = makeStyles(theme => ({
    list: {
        height: null
    },
    listItem: {
        borderBottom: '1px solid black',
        paddingBottom: '8px'
    },
    paper: {
        margin: 0
    },
    button: {
        margin: '0px 10px'
    },
    responsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
        // [theme.breakpoints.down('sm')]: {
        //     display: 'none'
        // }
    }
}));

export default function DecksList ({ decks, history }) {
    const classes = useStyles();
    const [items] = useState([...decks]);

    function handleNavigateToSummary (id) {
        history.push(`/deck/${id}/summary`);
    }

    const rowRenderer = ({ index, isScrolling, key, style }) => {
        const item = items[index];
        return (
            <ListItem
                key={key}
                className={classes.listItem}
                style={style}
                button
                onClick={() => {
                    const mediaMatch = window.matchMedia('(max-width: 401px)')
                        .matches;
                    if (mediaMatch) {
                        handleNavigateToSummary(item.id);
                    }
                }}
            >
                <ListItemText
                    primaryTypographyProps={{
                        variant: 'h6'
                    }}
                    primary={item.title}
                    secondary={`By: ${item.author.arenaHandle}`}
                />
                <Button
                    className={clsx(classes.button, classes.responsive)}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/deck/${item.id}/edit`}
                >
                    Edit
                </Button>
                <Button
                    className={clsx(classes.button, classes.responsive)}
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/deck/${item.id}/summary`}
                >
                    Summary
                </Button>
                <Button
                    className={clsx(classes.button, classes.responsive)}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/deck/${item.id}/card-details`}
                >
                    Card Details
                </Button>
            </ListItem>
        );
    };
    return (
        <Paper className={classes.paper}>
            <List className={classes.list}>
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <VirtualList
                            width={width}
                            height={300}
                            rowHeight={60}
                            rowCount={items.length}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </List>
        </Paper>
    );
}
