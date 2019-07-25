import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// locals
import Layout from './comps/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App () {
    console.log('\n', '\n', `hello App `, '\n', '\n');
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Layout>
        </Router>
    );
}

export default App;
