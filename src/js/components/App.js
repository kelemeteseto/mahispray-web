import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AccountPage from './Account';
import PasswordForgetPage from './PasswordForget';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import '../../css/App.css';
import '../../vendor/metisMenu/metisMenu.min.css';
import '../../dist/css/sb-admin-2.css';
import '../../vendor/morrisjs/morris.css';

const App = () =>    
    <Router>
        <div>
            <Navigation />

            <hr/>

            <Route exact path={routes.HOME} component={Home} />
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.REGISTER} component={Register} />                        
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        </div>
    </Router>

export default withAuthentication(App);
