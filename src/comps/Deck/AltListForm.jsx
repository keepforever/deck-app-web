import React, { Fragment, useContext } from 'react';
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
import { useAltListFormStyles } from './styles';
// graphql
import DECK_ALT_LIST_MUTATION from '../../graphql/m/DECK_ALT_LIST_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const AltListForm = props => {
    const context = useContext(AuthContext);
    const classes = useAltListFormStyles();
    const [values, handleChange, clearValues] = useForm({
        altList: ''
    });

    console.log('\n', '\n', `props.id = `, props.id, '\n', '\n');
    console.log('\n', '\n', `values = `, values, '\n', '\n');
    const [deckAltList, { loading, error }] = useMutation(DECK_ALT_LIST_MUTATION, {
        variables: {
            ...values,
            id: props.id
        },
        update: (_, {data: { deckAltList: deckAltListData }}) => {
            context.updateUserDecks(deckAltListData);
            context.addMessage(`Deck ${deckAltListData.title} Alt List Added`);
        },
        /* eslint-disable-next-line */
        refetchQueries: [{query: ALL_USERS_QUERY /* variables: {...} */}, {query: ALL_DECKS_QUERY}]
        // Video on updating the cache manually with update
        // https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    console.log('\n', '\n', `error = `, error, '\n', '\n');

    const submitAddAltDeckList = () => {
        deckAltList();
        clearValues();
    };

    return (
        <Fragment>
            {loading && (
                <Grid container spacing={1} className={classes.container}>
                    <CircularProgress />
                </Grid>
            )}
            {!loading && (
                <Grid container spacing={1} className={classes.container}>
                    <Grid item>
                        <Grid container className={classes.headingContainer}>
                            <Grid item>
                                <Typography variant="h5">
                                    Add Deck Form
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <TextField
                            multiline
                            fullWidth
                            label="Alt List"
                            id="altList"
                            name="altList"
                            value={values.altList}
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
                            Submit Alt List
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
};

export default AltListForm;
