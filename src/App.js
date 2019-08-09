import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
// locals
import Layout from './comps/layout/Layout';
import Home from './pages/Home';
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

function App () {
    return (
        <AuthProvider>
            <CardProvider>
                <Router>
                    <Layout>
                        <Switch>
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
                </Router>
            </CardProvider>
        </AuthProvider>
    );
}

export default App;
