import React, { useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// locals
import Decks from '../../pages/deck/Decks';
import Deck from '../Deck';
import AddDeck from './AddDeck';
import { AuthContext } from '../../context/auth';

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

function SubNav (props) {
    const context = useContext(AuthContext);

    if (!context.user) {
        props.history.push('/login');
    }

    console.log('\n', '\n', `Subnav, props = `, props, '\n', '\n');

    const { classes } = props;
    const [value, setValue] = useState(0);
    const onChange = (e, value) => {
        setValue(value);
    };
    return (
        <div className={classes.mainContainer}>
            <AppBar position="static">
                <Tabs value={value} onChange={onChange}>
                    <Tab label="Decks" component={Link} to="/home/decks" />
                    <Tab
                        label="Add Deck"
                        component={Link}
                        to="/home/add-deck"
                    />
                    <Tab label="Friends" component={Link} to="/home/friends" />
                </Tabs>
            </AppBar>
            <Route
                exact
                path="/home/decks"
                render={() => (
                    <div className={classes.root}>
                        {context.user && <Decks decks={context.user.decks} />}
                    </div>
                )}
            />
            <Route
                exact
                path="/home/decks/:id"
                render={() => {
                    console.log('\n', '\n', `/home/decks/:id HAVE RENDERED `, '\n', '\n');
                    return (
                        <div className={classes.root}>
                            <h1>`/home/decks/:id`</h1>
                            {context.user && (
                                <Deck deck={context.user.decks[0]} />
                            )}
                        </div>
                    );
                }}
            />
            <Route
                path="/home/add-deck"
                render={() => (
                    <div className={classes.addDeckTab}>
                        <AddDeck />
                    </div>
                )}
            />{' '}
            <Route
                path="/home/friends"
                render={() => (
                    <Typography component="div" className={classes.tabContent}>
                        {context.user && (
                            <div>
                                {context.user.decks.map(d => {
                                    console.log(
                                        '\n',
                                        '\n',
                                        `d = `,
                                        d,
                                        '\n',
                                        '\n'
                                    );
                                    return <p key={d.title}>{d.title}</p>;
                                })}
                            </div>
                        )}
                        {!context.user && <h3>Not logged in</h3>}
                    </Typography>
                )}
            />{' '}
        </div>
    );
}
export default withStyles(styles)(SubNav);
