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
import { useForm } from '../../hooks/useForm';
import { useLoginFormStyles } from './styled';
// graphql
import LOGIN_MUTATION from '../../graphql/m/LOGIN_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';
// context
import { AuthContext } from '../../context/auth';

const LoginForm = props => {
    // console.log('\n', '\n', `LoginForm, props = `, props, '\n', '\n');
    const context = useContext(AuthContext);
    const classes = useLoginFormStyles();
    const [values, handleChange] = useForm({
        email: 'a',
        password: 'a'
    });

    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        variables: values,
        update: (_, { data: { login: loginData } }) => {
            context.login(loginData);
            context.addMessage("You've logged in!");
            props.history.push('/home');
        },
        // you can refetch multiple queries, along with any variables associated with them using the refetchQueries option on useMutation.
        refetchQueries: [
            // eslint-disable-next-line
            { query: ALL_USERS_QUERY /* variables: {...} */ },
            { query: ALL_DECKS_QUERY }
        ],
        // TODO: May need to remove destructuring of token and check for existance before setting localStorage.
        onCompleted: ({ login: { token } }) => {
            // data.login.token
            // console.log(`
            // #########################################################
            //                 onCompleted
            // #########################################################
            // `);
            // console.log('\n', '\n', `token = `, token, '\n', '\n');
            window.localStorage.setItem(
                process.env.REACT_APP_AUTH_TOKEN_KEY,
                token
            );
            // console.log(`
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // #########################################################
            // `);
        }
        // Video on updating the cache manually with update https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    const submitLogin = async () => {
        await login();
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
                                    {loading ? 'Loading...' : '☮️'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container className={classes.headingContainer}>
                            <Grid item>
                                <Typography variant="h5">Login Form</Typography>
                            </Grid>
                        </Grid>
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
                        <Button
                            variant="outlined"
                            className={classes.loginButton}
                            fullWidth
                            onClick={() => submitLogin()}
                        >
                            SIGN IN
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
};

export default LoginForm;
