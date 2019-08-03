import React from 'react';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// locals
import DeckListItem from '../../comps/DeckListItem';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        textAlign: 'center',
        fontSize: '13px',
        color: 'black'
    },
    container: {
        padding: '0px'
    }
});

const Decks = ({ classes, decks = [] }) => (
    <div className={classes.root}>
        <Grid className={classes.container} container spacing={1}>
            {!!decks.length &&
                decks.map((d, i) => {
                    return <DeckListItem key={d.id} {...d} />;
                })}
        </Grid>
    </div>
);
export default withStyles(styles)(Decks);
