import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const useAddDeckStyles = makeStyles(theme => ({
    container: {
        minWidth: '360px',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    paper: {
        padding: 30,
        marginTop: 30
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
