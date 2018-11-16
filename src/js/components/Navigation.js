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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="nav-item active">
            <Link className="nav-link" to={routes.HOME}>Mahi Spray</Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to={routes.HOME}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routes.ACCOUNT}>Account</Link>
                </li>                
                <SignOutButton className="btn btn-secondary my-2 my-sm-0" />
            </ul>
        </div>
    </nav>    

const NavigationNonAuth = () =>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="navbar-brand">
            <Link className="nav-item" to={routes.LOGIN}>Mahi Spray</Link>
        </div>        

        <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">       
                <li className="nav-item">
                    <Link className="nav-link" to={routes.LOGIN}>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={routes.REGISTER}>Register</Link>
                </li>
            </ul>
        </div>
    </nav>

export default Navigation;