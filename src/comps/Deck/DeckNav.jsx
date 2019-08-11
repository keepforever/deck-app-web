import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// utils
import utils from '../../utils';
// styles
import { deckNavStyles } from './styles';

function DeckNav (props) {
    const { deckNavSwitch } = utils;
    const { classes } = props;

    let tabString;

    useEffect(() => {
        const temp = props.match.url.split('/');
        tabString = temp[temp.length - 1];
        setValue(deckNavSwitch(tabString));
    }, []);

    const { id } = props.match.params;
    const [value, setValue] = useState(deckNavSwitch(tabString));

    const onChange = (e, value) => {};

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
export default withStyles(deckNavStyles)(DeckNav);
