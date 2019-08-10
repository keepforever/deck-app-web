import React from 'react';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    card: {
        marginTop: '30px',
        maxWidth: 400,
        background: 'grey'
    },
    content: {
        marginTop: theme.spacing(1)
    }
});
const DeckCard = ({ classes, title = '', author: { arenaHandle = '' } = '' }) => {
    return (
        <>
            {title && (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">{title}</Typography>
                        <Typography variant="subtitle1">
                            by {arenaHandle}
                        </Typography>
                        <Typography className={classes.content}>
                            maybe a description in the future.
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default withStyles(styles)(DeckCard);
