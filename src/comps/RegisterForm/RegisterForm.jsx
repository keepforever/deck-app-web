import React, { Fragment } from 'react';
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
import { useStyles, makeString } from './utils';
// graphql
import REGISTER_MUTATION from '../../graphql/m/REGISTER_MUTATION';
import ALL_USERS_QUERY from '../../graphql/q/ALL_USERS';
import ALL_DECKS_QUERY from '../../graphql/q/ALL_DECKS_QUERY';

const RegisterForm = props => {
    const classes = useStyles();
    const [values, handleChange] = useForm({
        name: makeString(5),
        email: makeString(5) + '@' + 'gmail.com',
        password: 'a',
        arenaHandle: makeString(6),
        isAdmin: false
    });

    const [signup, { loading }] = useMutation(REGISTER_MUTATION, {
        variables: values,
        // you can refetch multiple queries, along with any variables associated
        // with them using the refetchQueries option on useMutation.
        refetchQueries: [{query: ALL_USERS_QUERY /* variables: {...} */}, {query: ALL_DECKS_QUERY}]
        // Video on updating the cache manually with update
        // https://www.youtube.com/watch?v=lQ7t20gFR14
    });

    const register = () => {
        console.log('\n', '\n', `values = `, values, '\n', '\n');
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
                                <Typography variant="h5">
                                    Register Form
                                </Typography>
                            </Grid>
                        </Grid>
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
                            onClick={() => register()}
                        >
                            SIGN IN
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Fragment>
    );
};

export default RegisterForm;
