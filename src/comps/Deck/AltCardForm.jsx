import React, { Fragment, useContext, useState } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
// import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// locals
import CardItem from './CardItem';
import AltCardSearch from './AltCardSearch';
import { CardContext } from '../../context/card';
import { AuthContext } from '../../context/auth';
import { useAltCardFormStyles } from './styles';
import utils from '../../utils';
// graphql
import DECK_ALT_CARD_MUTATION from '../../graphql/m/DECK_ALT_CARD_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const AltCardFormModal = props => {
    const classes = useAltCardFormStyles();
    const {
        getCard,
        getCardLookup,
        buildAltCardObject,
        getCardByDirectLookup
    } = utils;

    // useContext
    const authContext = useContext(AuthContext);
    const cardContext = useContext(CardContext);

    // Dialog Box
    const [dialogOpen, setDialogOpen] = useState(false);

    // Card State
    const [originalCard, setOriginalCard] = useState(null);
    const [originalCardLookup, setOriginalCardLookup] = useState('');
    const [altCard, setAltCard] = useState(null);
    const [altCardKey, setAltCardKey] = useState(null);

    // Helper Functions
    const onDialogOpen = card => {
        setOriginalCardLookup(getCardLookup(card));
        setOriginalCard(getCard(card, cardContext));
        setDialogOpen(true);
    };
    const onDialogClose = () => {
        setDialogOpen(false);
        setAltCardKey(null);
        setAltCard(null);
    };
    const handleSetAltCard = cardKey => {
        setAltCardKey(cardKey);
        const altCard = buildAltCardObject(
            originalCardLookup,
            cardKey,
            authContext.user,
            props.deck.altCard
        );
        setAltCard(altCard);
    };

    // Apollo
    const [deckAltCard, { loading }] = useMutation(DECK_ALT_CARD_MUTATION, {
        variables: {
            altCard: JSON.stringify(altCard),
            id: props.id
        },
        update: (_, { data: { deckAltCard: deckAltCardData } }) => {
            // authContext.updateUserDecks(deckAltCardData);
            // authContext.addMessage(`Deck ${deckAltCardData.title} Alt List Added`);
            console.log('\n', `UPDATE `, '\n');
            setAltCard(null);
        },
        refetchQueries: [
            /* eslint-disable-next-line */
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ],
        onCompleted: data => {
            console.log('\n', '\n', `onCompleted, data = `, data, '\n', '\n');
            onDialogClose();
        }
        // Video on updating the cache manually with update
        // https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    const submitAddAltCard = () => {
        deckAltCard();
    };

    return (
        <Fragment>
            {props.deck.list.split('\n').map((card, index) => {
                const { name, type_line } = getCard(card, cardContext);
                return (
                    <ListItem key={index} button dense>
                        <ListItemText primary={name} secondary={type_line} />
                        <Button
                            color="inherit"
                            onClick={() => {
                                onDialogOpen(card);
                            }}
                        >
                            Add Alt
                        </Button>
                    </ListItem>
                );
            })}
            {loading && (
                <Grid container spacing={1} className={classes.container}>
                    <CircularProgress />
                </Grid>
            )}
            {originalCard && (
                <Dialog maxWidth="xl" open={dialogOpen} onClose={onDialogClose}>
                    <DialogTitle style={{ marginBottom: '20px' }}>
                        Dialog Title
                    </DialogTitle>
                    <DialogContent>
                        {!loading && (
                            <Grid
                                container
                                spacing={1}
                                className={classes.container}
                            >
                                <Grid item style={{ fontWeight: 'bold' }}>
                                    <Grid
                                        container
                                        spacing={1}
                                        className={classes.before}
                                    >
                                        <Grid item>
                                            <DialogContentText>
                                                Original
                                            </DialogContentText>
                                        </Grid>
                                        <Grid item>
                                            <CardItem {...originalCard} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid style={{ marginTop: '15px' }} item>
                                    <AltCardSearch
                                        onSetAltCard={handleSetAltCard}
                                    />
                                </Grid>
                                {altCard && (
                                    <Grid item style={{ fontWeight: 'bold' }}>
                                        <Grid
                                            container
                                            spacing={1}
                                            className={classes.before}
                                        >
                                            <Grid item>
                                                <DialogContentText>
                                                    Alternate
                                                </DialogContentText>
                                            </Grid>
                                            <Grid item>
                                                <CardItem
                                                    {...getCardByDirectLookup(
                                                        altCardKey,
                                                        cardContext
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                                {!altCard && (
                                    <Grid item style={{ fontWeight: 'bold' }}>
                                        <Grid
                                            container
                                            spacing={1}
                                            className={classes.before}
                                        >
                                            <Grid item>
                                                <DialogContentText>
                                                    Alternate
                                                </DialogContentText>
                                            </Grid>
                                            <Grid item>
                                                <CardItem isUnknown />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                submitAddAltCard();
                            }}
                            color="primary"
                        >
                            Do it
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Fragment>
    );
};

export default AltCardFormModal;
