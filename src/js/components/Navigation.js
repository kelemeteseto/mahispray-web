import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './AuthUserContext';
import Profile from '../components/Profile';
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="navbar-brand">
            <Link className="nav-item" to={routes.HOME}>Mahi Spray</Link>
        </div>

        <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mr-auto">                
                <Link className="nav-item nav-link" to={routes.HOME}>Home</Link>                                
                <Link className="nav-item nav-link" to={routes.ACCOUNT}>Account</Link>
            </ul>
            <Profile />
        </div>
    </nav>    

const NavigationNonAuth = () =>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="navbar-brand">
            <Link className="nav-item" to={routes.LOGIN}>Mahi Spray</Link>
        </div>        

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">                       
                <Link className="nav-item nav-link" to={routes.LOGIN}>Login</Link>                                
                <Link className="nav-item nav-link" to={routes.REGISTER}>Register</Link>                
            </ul>
        </div>
    </nav>

export default Navigation;