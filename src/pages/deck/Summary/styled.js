import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useSummaryStyles = makeStyles(theme => ({
    root: { padding: '30px', textAlign: 'center' },
    tableCell: { padding: '0px', margin: '0px' },
    responsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    hideWhenLarge: {
        [theme.breakpoints.up('lg')]: {
            display: 'none'
        },
        [theme.breakpoints.up('xl')]: {
            display: 'none'
        },
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    max-width: 60vw;
    margin: auto;

    @media (max-width: 401px) {
        max-width: 100%;
    }
`;
