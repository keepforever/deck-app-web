import React, { useContext } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';
import { useAddDeckStyles } from './styled';
import utils from '../../utils';
// graphql
import ADD_DECK_MUTATION from '../../graphql/m/ADD_DECK_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const RegisterForm = props => {
    const { makeLauremString } = utils;
    const context = useContext(AuthContext);
    const classes = useAddDeckStyles();
    const [values, handleChange, clearValues] = useForm({
        title: 'From Client ' + makeLauremString(5),
        list: ''
    });

    const [createDeck, { loading }] = useMutation(ADD_DECK_MUTATION, {
        variables: {
            ...values,
            token: context.user ? context.user.token : ''
        },
        update: (_, { data: { createDeck: createDeckData } }) => {
            context.updateUserDecks(createDeckData);
            context.addMessage(`Deck ${createDeckData.title} Created!`);
        },
        refetchQueries: [
            /* eslint-disable-next-line */
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ]
        // Video on updating the cache manually with update
        // https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    const submitCreateDeck = () => {
        createDeck();
        clearValues();
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}
        >
            {loading && (
                <Grid container spacing={1} className={classes.container}>
                    <CircularProgress />
                </Grid>
            )}

            {!loading && (
                <Grid
                    container
                    justify="center"
                    spacing={2}
                    className={classes.container}
                >
                    <Grid container justify="center" item>
                        <Typography variant="h5">
                            {loading ? 'Loading...' : '☮️'}
                        </Typography>
                    </Grid>
                    <Grid container justify="center">
                        <Typography variant="h5">Add Deck Form</Typography>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="title"
                            id="title"
                            label="Title"
                            value={values.title}
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            multiline
                            fullWidth
                            label="Deck List"
                            id="list"
                            name="list"
                            value={values.list}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            className={classes.loginButton}
                            fullWidth
                            onClick={() => submitCreateDeck()}
                        >
                            Submit New Deck
                        </Button>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default RegisterForm;
