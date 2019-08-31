import React from 'react';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    card: {
        margin: '30px 0px',
        textAlign: 'center'
    },
    content: {
        margin: '15px 0px'
    }
});
const GenericPlacard = withStyles(styles)(({ classes, title }) => (
    <Card className={classes.card}>
        <CardContent>
            <Typography variant="h3">{title}</Typography>
        </CardContent>
    </Card>
));
export default GenericPlacard;
