import React, { useContext, useState } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// locals
import AltCardListItemExpansion from '../AltCardListItemExpansion';
import CardItem from './CardItem';
import AltCardSearch from './AltCardSearch';
import { CardContext } from '../../context/card';
import { AuthContext } from '../../context/auth';
import { useAltCardFormStyles, Container } from './styles';
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
        getCardByDirectLookup,
        buildAltCardItemsArray,
        combineMainAndSideboard
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
    function onDialogOpen (card) {
        setOriginalCardLookup(getCardLookup(card, cardContext));
        setOriginalCard(getCard(card, cardContext));
        setDialogOpen(true);
    }

    function onDialogClose () {
        setDialogOpen(false);
        setAltCardKey(null);
        setAltCard(null);
    }

    function handleSetAltCard (cardKey) {
        setAltCardKey(cardKey);
        const altCard = buildAltCardObject(
            originalCardLookup,
            cardKey,
            authContext.user,
            props.deck.altCard
        );
        setAltCard(altCard);
    }

    function submitAddAltCard () {
        deckAltCard();
    }

    // Apollo
    const [deckAltCard, { loading }] = useMutation(DECK_ALT_CARD_MUTATION, {
        variables: {
            altCard: JSON.stringify(altCard),
            id: props.id
        },
        update: (_, { data: { deckAltCard: deckAltCardData } }) => {
            setAltCard(null);
        },
        refetchQueries: [
            /* eslint-disable-next-line */
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ],
        onCompleted: data => {
            onDialogClose();
        }
    });

    const mainAndSide = combineMainAndSideboard(props.deck);

    return (
        <Container>
            {loading && (
                <Grid container spacing={1} className={classes.container}>
                    <CircularProgress />
                </Grid>
            )}
            {mainAndSide.map((card, index) => {
                const originalCard = getCard(card, cardContext);
                const altCardsArray = buildAltCardItemsArray(
                    originalCard.lookup === 'missing'
                        ? card
                        : originalCard.lookup,
                    props.cardAlternateMap,
                    cardContext
                );

                return (
                    <AltCardListItemExpansion
                        key={originalCard.lookup}
                        {...originalCard}
                        onDialogOpen={() => {
                            onDialogOpen(card);
                        }}
                        altCards={altCardsArray}
                    />
                );
            })}

            {/* DIALOG JSX */}

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
        </Container>
    );
};

export default AltCardFormModal;
