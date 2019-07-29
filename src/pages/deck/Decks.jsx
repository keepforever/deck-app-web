import React from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={`/home/decks/${d.id}`}
                                >
                                    {d.title}
                                </Button>{' '}
                                <br />
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
