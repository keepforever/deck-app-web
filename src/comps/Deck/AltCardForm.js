import React, { Fragment, useContext, useState } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
// locals
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';
import { useStyles } from './utils';
// graphql
import DECK_ALT_LIST_MUTATION from '../../graphql/m/DECK_ALT_LIST_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const AltCardFormModal = props => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const onDialogOpen = () => {
        setDialogOpen(true);
    };
    const onDialogClose = () => {
        setDialogOpen(false);
    };
    const onSnackbarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };
    const onCreate = () => {
        setSnackbarOpen(true);
        setSnackbarMessage(`Alt created`);
        onDialogClose();
    };

    // MY STUFF

    const context = useContext(AuthContext);
    const classes = useStyles();
    const [values, handleChange, clearValues] = useForm({
        altCard: ''
    });

    console.log('\n', '\n', `props.id = `, props.id, '\n', '\n');
    console.log('\n', '\n', `values = `, values, '\n', '\n');

    const [deckAltCard, { loading }] = useMutation(DECK_ALT_LIST_MUTATION, {
        variables: {
            ...values,
            id: props.id
        },
        update: (_, { data: { deckAltCard: deckAltCardData } }) => {
            context.updateUserDecks(deckAltCardData);
            context.addMessage(`Deck ${deckAltCardData.title} Alt List Added`);
        },
        refetchQueries: [
            /* eslint-disable-next-line */
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ]
        // Video on updating the cache manually with update
        // https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    const submitAddAltDeckList = () => {
        deckAltCard();
        clearValues();
    };

    return (
        <Fragment>
            {props.deck.list.split('\n').map((card, index) => {
                return (
                    <ListItem key={index} button dense>
                        <ListItemText primary={card} secondary="whatever" />
                        <Button color="inherit" onClick={onDialogOpen}>
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
            <Dialog open={dialogOpen} onClose={onDialogClose}>
                <DialogTitle>New User</DialogTitle>
                <DialogContent>
                    {!loading && (
                        <Grid
                            container
                            spacing={1}
                            className={classes.container}
                        >
                            <Grid item>
                                <Grid
                                    container
                                    className={classes.headingContainer}
                                >
                                    <Grid item>
                                        <Typography variant="h5">
                                            Alt For SELECTED_CARD_NAME
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    label="Alt Card"
                                    id="altCard"
                                    name="altCard"
                                    value={values.altCard}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="outlined"
                                    className={classes.loginButton}
                                    fullWidth
                                    onClick={() => submitAddAltDeckList()}
                                >
                                    Submit Alt Card
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onCreate}
                        color="primary"
                    >Do it</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={onSnackbarClose}
                autoHideDuration={4000}
            />
        </Fragment>
    );
};

export default AltCardFormModal;
