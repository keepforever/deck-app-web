import { makeStyles } from '@material-ui/styles';

export const useAltCardListItemExpansionStyles = makeStyles(theme => {
    // console.log('\n', '\n', `theme = `, theme, '\n', '\n');
    return {
        panelDetails: {
            flexDirection: 'column',
            height: 250,
            overflow: 'auto'
        }
    };
});
