import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// utils
import utils from '../../utils';
// styles
import { deckNavStyles } from './styles';

function DeckNav (props) {
    const { deckNavSwitch } = utils;
    const { classes, copyDeckString = '' } = props;

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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Tabs value={value} onChange={onChange}>
                        <Tab
                            label="Summary"
                            component={Link}
                            to={`/deck/${id}/summary`}
                        />
                        <Tab
                            label="Edit"
                            component={Link}
                            to={`/deck/${id}/edit`}
                        />
                        <Tab
                            label="Cards Deets"
                            component={Link}
                            to={`/deck/${id}/card-details`}
                        />
                    </Tabs>
                    <CopyToClipboard
                        onCopy={() => {
                            // addMessage('Copied All Codes!', 'success');
                        }}
                        text={copyDeckString}
                    >
                        <Button
                            style={{ marginRight: '30px' }}
                            variant="contained"
                            color="secondary"
                        >
                            Export to Arena
                        </Button>
                    </CopyToClipboard>
                </div>
            </AppBar>
        </div>
    );
}
export default withStyles(deckNavStyles)(DeckNav);
