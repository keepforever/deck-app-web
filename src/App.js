import React from 'react';
import './App.css';
import {
    // BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
import { AuthProvider as UseAuthProvider } from 'react-use-auth';
// locals
import Layout from './comps/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddDeck from './pages/AddDeck';
import AuthCallback from './pages/AuthCallback';
// Deck
import Summary from './pages/deck/Summary';
import CardDetails from './pages/deck/CardDetails';
import Edit from './pages/deck/Edit';
// context
import { AuthProvider } from './context/auth';
import { CardProvider } from './context/card';

function App (props) {
    return (
        <UseAuthProvider
            navigate={props.history.push}
            auth0_domain={process.env.REACT_APP_AUTH0_DOMAIN}
            auth0_client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
        >
            <AuthProvider>
                <CardProvider>
                    <Layout>
                        <Switch>
                            <Route path="/auth0_callback" component={AuthCallback} />
                            <Route exact path="/" render={() => <Redirect to="/home" />} />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/add" component={AddDeck} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/deck/:id/summary" component={Summary} />
                            <Route exact path="/deck/:id/card-details" component={CardDetails} />
                            <Route exact path="/deck/:id/edit" component={Edit} />
                        </Switch>
                    </Layout>
                </CardProvider>
            </AuthProvider>
        </UseAuthProvider>
    );
}

export default withRouter(App);
