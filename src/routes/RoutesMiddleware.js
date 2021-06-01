import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, allowedAuthorities, authorityKey, ...rest }) {
    const user  = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) =>
                !!user ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
}
function AuthRoute({component: Component, allowedAuthorities, authorityKey, ...rest}) {
    const user = localStorage.getItem('token');
    return (
        <Route
            {...rest}
            render={(props) => !! user ?
                <Redirect to="/"/> :
                <Component {...props} />}
        />
    );
}


export  {PrivateRoute,AuthRoute};
