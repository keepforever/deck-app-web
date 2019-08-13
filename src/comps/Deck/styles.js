import { makeStyles } from '@material-ui/styles';

export const useAltListFormStyles = makeStyles(theme => ({
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

export const useAltCardFormStyles = makeStyles(theme => ({
    container: {
        maxWidth: '90vw',
        padding: '5px',
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

export const deckNavStyles = theme => ({
    mainContainer: {
        backgroundColor: 'grey'
    },
    root: {
        flexGrow: 1,
        backgroundColor: 'grey',
        padding: '30px'
    },
    addDeckTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabContent: {
        padding: theme.spacing(2)
    }
});

export const deckCardStyles = theme => ({
    card: {
        marginTop: '30px',
        maxWidth: 400,
        background: 'grey'
    },
    content: {
        marginTop: theme.spacing(1)
    }
});
