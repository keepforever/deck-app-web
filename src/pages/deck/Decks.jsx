import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
                    return (
                        <Grid key={d.id} item xs={12} sm={6} md={3} lg={12}>
                            <Paper className={classes.paper}>
                                {d.title} <br />
                                {d.list.split('\n').map(card => {
                                    return <p key={card}>{card}</p>;
                                })}
                            </Paper>
                        </Grid>
                    );
                })}
        </Grid>
    </div>
);
export default withStyles(styles)(Decks);
