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
        fontSize: '12px',
        color: theme.palette.text.secondary
    },
    container: {
        padding: '30px'
    }
});

const GridDemo = withStyles(styles)(({ classes, users = [] }) => (
    <div className={classes.root}>
        <Grid className={classes.container} container spacing={1}>
            {users.map((u, i) => {
                return (
                    <Grid key={u.id} item xs={12} sm={6} md={3} lg={12}>
                        <Paper className={classes.paper}>
                            ID: {u.id} Name: {u.name} Email: {u.email}
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    </div>
));
export default GridDemo;
