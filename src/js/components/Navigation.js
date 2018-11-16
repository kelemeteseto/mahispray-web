import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = () =>
    <AuthUserContext.Consumer> 
        { 
            authUser => authUser
                ? <NavigationAuth /> 
                : <NavigationNonAuth /> 
        }
    </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <ul>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <SignOutButton />
    </ul>

const NavigationNonAuth = () =>
    <ul>        
        <li><Link to={routes.LOGIN}>Login</Link></li>
        <li><Link to={routes.REGISTER}>Register</Link></li>
    </ul>

export default Navigation;