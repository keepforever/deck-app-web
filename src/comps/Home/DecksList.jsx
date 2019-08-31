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
        height: 300
    },
    paper: {
        margin: 15
    }
}));

export default function ScrollingLists ({ decks }) {
    const classes = useStyles();
    const [items] = useState([...decks]);

    const rowRenderer = ({ index, isScrolling, key, style }) => {
        console.log('\n', '\n', `isScrolling = `, isScrolling, '\n', '\n');
        const item = items[index];
        console.log('\n', '\n', `item = `, item, '\n', '\n');
        return (
            <ListItem button key={key} style={style}>
                <ListItemText
                    primary={item.title}
                    secondary={`By: ${item.author.arenaHandle}`}
                />
                <Button
                    color="inherit"
                    component={Link}
                    to={`/deck/${item.id}/edit`}
                >
                    Edit
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to={`/deck/${item.id}/summary`}
                >
                    Summary
                </Button>
                <Button
                    color="inherit"
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
