import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    card: {
        margin: '15px 0px'
    },
    content: {
        marginTop: theme.spacing(1)
    }
});
const UserPlacard = withStyles(styles)(({ classes, name, handle }) => (
    <Card className={classes.card}>
        <CardContent>
            <Typography variant="h3">Welcome, {name}</Typography>
            <Typography variant="h5">Arena Handle: {handle}</Typography>
            <Typography variant="h6" className={classes.content}>
                You'll find your decks below.
            </Typography>
        </CardContent>
    </Card>
));
export default UserPlacard;
