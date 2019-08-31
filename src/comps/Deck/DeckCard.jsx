import React from 'react';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
// styles
import { deckCardStyles } from './styles';

const DeckCard = ({
    classes,
    title = '',
    author: { arenaHandle = '' } = ''
}) => {
    return (
        <>
            {title && (
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={4}>
                            <Grid
                                className={classes.centerItemContent}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                            >
                                <Typography variant="h4">{title}</Typography>
                            </Grid>
                            <Grid
                                className={classes.centerItemContent}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                            >
                                <Avatar style={{ marginBottom: '15px' }}>
                                    <PersonIcon />
                                </Avatar>{' '}
                                <Typography variant="h5">
                                    {arenaHandle}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default withStyles(deckCardStyles)(DeckCard);
