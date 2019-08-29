import React from 'react';
import './App.css';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
// locals
import { AuthRoute } from './comps/AuthRoute';

import Layout from './comps/Layout';
import Home from './pages/Home';
import PersistLogin from './pages/PersistLogin';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDeck from './pages/AddDeck';
// Deck
import Summary from './pages/deck/Summary';
import CardDetails from './pages/deck/CardDetails';
import Edit from './pages/deck/Edit';
// context
import { AuthProvider } from './context/auth';
import { CardProvider } from './context/card';

function App (props) {
    return (
        <AuthProvider>
            <CardProvider>
                <Layout>
                    <Switch>
                        {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
                        <Route
                            exact
                            path="/"
                            render={() => {
                                if (
                                    window.localStorage.getItem(
                                        process.env.REACT_APP_AUTH_TOKEN_KEY
                                    )
                                ) {
                                    return <Redirect to="/persist" />;
                                } else {
                                    return <Redirect to="/login" />;
                                }
                            }}
                        />
                        <Route exact path="/persist" component={PersistLogin} />
                        <AuthRoute exact path="/home" component={Home} />
                        {/* <Route exact path="/add" component={AddDeck} /> */}
                        <AuthRoute exact path="/add" component={AddDeck} />

                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <AuthRoute
                            exact
                            path="/deck/:id/summary"
                            component={Summary}
                        />
                        <AuthRoute
                            exact
                            path="/deck/:id/card-details"
                            component={CardDetails}
                        />
                        <AuthRoute
                            exact
                            path="/deck/:id/edit"
                            component={Edit}
                        />
                    </Switch>
                </Layout>
            </CardProvider>
        </AuthProvider>
    );
}

export default withRouter(App);
