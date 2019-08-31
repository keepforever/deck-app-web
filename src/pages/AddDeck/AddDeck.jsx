import React, { useContext, useState, useEffect } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import GenericPlacard from '../../comps/GenericPlacard';
import { AuthContext } from '../../context/auth';
import { useForm } from '../../hooks/useForm';
import { useAddDeckStyles, Container } from './styled';
import utils from '../../utils';
// graphql
import ADD_DECK_MUTATION from '../../graphql/m/ADD_DECK_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const testingDeckList =
    "3 Fblthp, the Lost (WAR) 50\n2 Manifold Key (M20) 230\n\n1 Manifold Key (M20) 230\n1 Grafdigger's Cage (M20) 227";

const RegisterForm = props => {
    const { makeLauremString } = utils;
    const context = useContext(AuthContext);
    const classes = useAddDeckStyles();
    const [mainBoardList, setMainBoardList] = useState('');
    const [sideBoardList, setSideBoardList] = useState('');
    const [isSideBoard, setIsSideBoard] = useState(false);

    const [values, handleChange, clearValues] = useForm({
        title: 'Title: ' + makeLauremString(5),
        list: window.location.host.includes('localhost') ? testingDeckList : ''
    });

    function submitCreateDeck () {
        createDeck();
        clearValues();
    }

    function preProcessSubmission () {
        const validateReturnArray = utils.validateAddDeckList(values.list);
        if (validateReturnArray[0]) {
            setIsSideBoard(validateReturnArray[0]);
            setSideBoardList(validateReturnArray[1]);
            setMainBoardList(validateReturnArray[2]);
        } else {
            setIsSideBoard(false);
            setSideBoardList('');
            setMainBoardList('');
        }
    }

    useEffect(() => {
        preProcessSubmission();
    }, [values.list]);

    const [createDeck, { loading }] = useMutation(ADD_DECK_MUTATION, {
        variables: {
            title: values.title,
            list: isSideBoard ? mainBoardList : values.list,
            sideBoardList: isSideBoard ? sideBoardList : ''
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
    });

    return (
        <Container>
            <Paper className={classes.paper}>
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
                        <Grid item>
                            <GenericPlacard
                                title="Add Deck List"
                                varient="h5"
                            />
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
                                onChange={e => {
                                    handleChange(e);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.loginButton}
                                fullWidth
                                onClick={() => {
                                    submitCreateDeck();
                                }}
                            >
                                Submit New Deck
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Container>
    );
};

export default RegisterForm;
