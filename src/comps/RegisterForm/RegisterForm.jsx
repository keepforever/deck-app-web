import React, { Fragment, useContext } from 'react';
// apollo
import { useMutation } from '@apollo/react-hooks';
// material-ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// locals
import { useForm } from '../../hooks/useForm';
import { useRegisterFormStyles } from './styled';
import utils from '../../utils';
// graphql
import REGISTER_MUTATION from '../../graphql/m/REGISTER_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';
import { AuthContext } from '../../context/auth';

const RegisterForm = props => {
    const authContext = useContext(AuthContext);
    const classes = useRegisterFormStyles();
    // const { makeLauremString } = utils;
    // const [values, handleChange] = useForm({
    //     name: makeLauremString(5),
    //     email: makeLauremString(5) + '@' + 'gmail.com',
    //     password: 'a',
    //     arenaHandle: makeLauremString(6),
    //     isAdmin: false
    // });

    const [values, handleChange] = useForm({
        name: '',
        email: '',
        password: '',
        arenaHandle: '',
        isAdmin: false
    });

    const [signup, { loading }] = useMutation(REGISTER_MUTATION, {
        variables: values,
        refetchQueries: [
            /* eslint-disable-next-line */
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ],
        update: (_, { data: { signup: signupData } }) => {
            authContext.login(signupData);
        },
        onCompleted: ({ signup: { token } }) => {
            authContext.addMessage("You've registered! Welcome!");
            window.localStorage.setItem(
                process.env.REACT_APP_AUTH_TOKEN_KEY,
                token
            );
            props.history.push('/home');
        }
    });

    const register = () => {
        signup();
    };

    return (
        <Fragment>
            {loading && (
                <Grid container spacing={1} className={classes.container}>
                    <CircularProgress />
                </Grid>
            )}

            {!loading && (
                <Paper
                    style={{
                        minWidth: '399px',
                        padding: '15px',
                        marginTop: '60px'
                    }}
                >
                    <Grid container spacing={1} className={classes.container}>
                        <Grid item className={classes.headingContainer}>
                            <Typography variant="h3">
                                {loading ? 'Loading...' : 'Register'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                name="name"
                                id="name"
                                label="Name"
                                value={values.name}
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="email"
                                id="email"
                                type="email"
                                label="Email"
                                value={values.email}
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                fullWidth
                                onChange={handleChange}
                                // InputProps={{
                                //     className: classes.input
                                // }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="arenaHandle"
                                id="arenaHandle"
                                label="Arena Handle"
                                value={values.arenaHandle}
                                fullWidth
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                className={classes.loginButton}
                                fullWidth
                                onClick={() => {
                                    window.localStorage.removeItem(
                                        process.env.REACT_APP_AUTH_TOKEN_KEY
                                    );
                                    register();
                                }}
                            >
                                Register New Account
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Fragment>
    );
};

export default RegisterForm;
