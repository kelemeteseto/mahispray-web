import React from 'react';

import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const AccountPage = () =>
    <AuthUserContext.Consumer>
        {
            authUser =>
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetForm />
                    <PasswordChangeForm />
                </div>
        }
    </AuthUserContext.Consumer>

const authCondidtion = (authUser) => !!authUser;

export default withAuthorization(authCondidtion)(AccountPage);