import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';

export const useSummaryStyles = makeStyles(theme => ({
    root: { background: 'cornsilk', padding: '30px', textAlign: 'center' },
    tableCell: { padding: '0px', margin: '0px' }
}));

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    max-width: 60vw;
    margin: auto;
`;
