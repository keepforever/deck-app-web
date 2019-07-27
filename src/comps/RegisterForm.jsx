import React from 'react';
// material-ui
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// locals
import { useForm } from '../hooks/useForm';

const register = () => {
    console.log('\n', '\n', `register = `, '\n', '\n');
};

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: '600px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    input: {
        color: 'black',
        background: 'white',
        border: '1px solid grey',
        fontSize: '14px',
        padding: '5px 10px'
    },
    loginButton: {
        background: 'blue',
        color: 'white',
        padding: '10px 0px',
        marginBottom: '12px',
        marginTop: '24px'
    }
}));

const RegisterForm = props => {
    const classes = useStyles();
    const [values, handleChange] = useForm({
        name: '',
        email: '',
        password: '',
        arenaHandle: ''
    });
    return (
        <Grid container spacing={1} className={classes.container}>
            <Grid item>
                <Grid container className={classes.headingContainer}>
                    <Grid item>
                        <Typography variant="h5">Register Form</Typography>
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
    );
};

export default RegisterForm;
