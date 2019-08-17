import { makeStyles } from '@material-ui/styles';

export const useAltCardListItemExpansionStyles = makeStyles(theme => ({
    panelDetails: {
        flexDirection: 'column',
        height: 250,
        overflow: 'auto'
    }
}));
