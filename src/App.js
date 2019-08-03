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
// context
import { AuthProvider } from './context/auth';

function App () {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <Redirect to="/home/decks" />}
                        />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
