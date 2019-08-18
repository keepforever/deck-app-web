import React from 'react';
import './App.css';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
// locals
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
                            render={() => <Redirect to="/persist" />}
                        />
                        <Route exact path="/persist" component={PersistLogin} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/add" component={AddDeck} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route
                            exact
                            path="/deck/:id/summary"
                            component={Summary}
                        />
                        <Route
                            exact
                            path="/deck/:id/card-details"
                            component={CardDetails}
                        />
                        <Route exact path="/deck/:id/edit" component={Edit} />
                    </Switch>
                </Layout>
            </CardProvider>
        </AuthProvider>
    );
}

export default withRouter(App);
