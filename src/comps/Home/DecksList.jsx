import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List as VirtualList, AutoSizer } from 'react-virtualized';
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
    paper: {
        margin: 0
    },
    button: {
        margin: '0px 10px'
    }
}));

export default function DecksList ({ decks }) {
    const classes = useStyles();
    const [items] = useState([...decks]);

    const rowRenderer = ({ index, isScrolling, key, style }) => {
        const item = items[index];
        return (
            <ListItem key={key} style={style}>
                <ListItemText
                    primary={item.title}
                    secondary={`By: ${item.author.arenaHandle}`}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/deck/${item.id}/edit`}
                >
                    Edit
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/deck/${item.id}/summary`}
                >
                    Summary
                </Button>
                <Button
                    className={classes.button}
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
                            rowHeight={50}
                            rowCount={items.length}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </List>
        </Paper>
    );
}
