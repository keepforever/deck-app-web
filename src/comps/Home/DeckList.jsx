import React from 'react';
import {Link} from 'react-router-dom';
// material-ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';

export default function DeckList ({ decks = [] }) {
    return (
        <List>
            {decks.map((item, index) => (
                <ListItem key={index} button dense>
                    <ListItemText
                        primary={item.title}
                        secondary="whatever"
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
            ))}
        </List>
    );
}
