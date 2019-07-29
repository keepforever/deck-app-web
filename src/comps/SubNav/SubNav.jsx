import React, { useState, useContext } from 'react';
import { Route, Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// locals
import GridDemo from '../GridDemo';
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
    console.log('\n', '\n', `Subnav, props = `, props, '\n', '\n');
    const { classes, gridDemoData = [] } = props;
    const [value, setValue] = useState(0);
    const onChange = (e, value) => {
        setValue(value);
    };
    return (
        <div className={classes.mainContainer}>
            <AppBar position="static">
                <Tabs value={value} onChange={onChange}>
                    <Tab label="Decks" component={Link} to="/home/page1" />
                    <Tab label="Add Deck" component={Link} to="/home/page2" />
                    <Tab label="Friends" component={Link} to="/home/page3" />
                </Tabs>
            </AppBar>
            <Route
                path="/home/page1"
                render={() => (
                    <div className={classes.root}>
                        <GridDemo users={gridDemoData} />
                    </div>
                )}
            />
            <Route
                path="/home/page2"
                render={() => (
                    <div className={classes.addDeckTab}>
                        <AddDeck />
                    </div>
                )}
            />{' '}
            <Route
                path="/home/page3"
                render={() => (
                    <Typography component="div" className={classes.tabContent}>
                        {context.user && (
                            <div>
                                {context.user.decks.map(d => {
                                    console.log('\n', '\n', `d = `, d, '\n', '\n');
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
