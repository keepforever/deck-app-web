import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// locals
import { AuthContext } from '../context/auth';

class C extends React.PureComponent {
    static contextType = AuthContext;

    renderRoute = routeProps => {
        const { component } = this.props;

        // user not logged in
        if (!this.context.user) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { next: routeProps.location.pathname }
                    }}
                />
            );
        }

        const Component = component;

        return <Component {...routeProps} />;
    };

    render () {
        // console.log('\n', 'helloAuthRoute' )
        const { data: _, component: __, ...rest } = this.props;
        return <Route {...rest} render={this.renderRoute} />;
    }
}

export const AuthRoute = C;
