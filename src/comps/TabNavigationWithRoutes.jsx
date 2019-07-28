import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// locals
import GridDemo from './GridDemo';

const styles = theme => ({
    mainContainer: {
        backgroundColor: 'grey'
    },
    root: {
        flexGrow: 1,
        backgroundColor: 'grey',
        padding: '30px'
    },
    tabContent: {
        padding: theme.spacing(2)
    }
});
function TabNavigationWithRoutes (props) {
    console.log(
        '\n',
        '\n',
        `TabNavigationWithRoutes, props = `,
        TabNavigationWithRoutes,
        props,
        '\n',
        '\n'
    );
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
                    <Typography component="div" className={classes.tabContent}>
                        Item Two
                    </Typography>
                )}
            />{' '}
            <Route
                path="/home/page3"
                render={() => (
                    <Typography component="div" className={classes.tabContent}>
                        Item Three
                    </Typography>
                )}
            />{' '}
        </div>
    );
}
export default withStyles(styles)(TabNavigationWithRoutes);
