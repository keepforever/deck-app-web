import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// locals
import { AuthContext } from '../../context/auth';
// hooks
import { deckNavSwitch } from './utils';

const styles = theme => ({
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

function DeckNav (props) {
    const { classes } = props;
    let tabString;

    useEffect(() => {
        const temp = props.match.url.split('/');
        tabString = temp[temp.length - 1];
        setValue(deckNavSwitch(tabString));
    }, []);

    const { id } = props.match.params;
    const [value, setValue] = useState(deckNavSwitch(tabString));

    const onChange = (e, value) => {
        // setValue(value);
        console.log('\n', '\n', `value = `, value, '\n', '\n');
    };

    return (
        <div className={classes.mainContainer}>
            <AppBar position="static">
                <Tabs value={value} onChange={onChange}>
                    <Tab label="Summary" component={Link} to={`/deck/${id}/summary`} />
                    <Tab
                        label="Edit"
                        component={Link}
                        to={`/deck/${id}/edit`}
                    />
                    <Tab label="Cards Deets" component={Link} to={`/deck/${id}/card-details`} />
                </Tabs>
            </AppBar>
        </div>
    );
}
export default withStyles(styles)(DeckNav);
